from flask import Flask, request, make_response, jsonify
from models import db, Doc, Patient, PatientRecord
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///med.db'
api=Api(app)
db.init_app(app)
migrate = Migrate(app,db)
jwt=JWTManager(app)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.urandom(24).hex()

class RegisterDoc(Resource):
    def post(self):
        # obtaining data from the form in front-end
        data = request.json

        # variable storing the new doctors information
        new_doc = Doc (
            name = data["name"],
            email= data["email"],
            password = data["password"],
        )

        # logic for checking if the doc has an account
        doc = Doc.query.filter(Doc.email == new_doc.email).first()

        #logic for returning response after checking db
        if doc is not None:
            response = make_response(
                jsonify({
                    "Error": "Account exists log in!"
                }),
                409
            )

            return response
        # adding the new doc to the database
        db.session.add(new_doc)
        db.session.commit()

        access_token_payload = {
            "doc_id": new_doc.id,
            "doc_name": new_doc.name,
        }

        #generate a token containing the payload

        access_token = create_access_token(identity = access_token_payload)

        #prepare the response data that will directed to the client-side
        response_data = {
            "message": "Reg Successful",
            "accessToken": access_token
        }
        # convert the data being passed to client-side to Json
        response = jsonify(response_data)
        # add the jwtToken to the headers in the client-side
        response.headers['Authorization'] = f'Bearer {access_token}'

        return response

api.add_resource(RegisterDoc, "/auth/registerdoctors")

class DocLogin(Resource):
    def post (self):

        email = request.json['email']
        password = request.json['password']

        doc_exists = Doc.query.filter(Doc.email == email).first()
        if doc_exists is None:
            response = make_response(
                jsonify({
                    "error": "Account not found"
                }), 401
            )
            return response
        password_exists = Doc.query.filter(Doc.password == password).first()

        if password_exists is None:
            response = make_response(
                jsonify({
                    "error": 'Wrong credentials'
                }), 401
            )
            return response
        
        access_token_payload = {
            "message": "login successful",
            "doc_id": doc_exists.id,
            "doc_name": doc_exists.name,
        }

        access_token = create_access_token(identity = access_token_payload)

        response_data = {
            "message": "login successful",
            'accessToken': access_token
        }
        response = make_response(
            jsonify(response_data), 201
        )
        response.headers['Authorization'] = f'Bearer {access_token}'
        return response
api.add_resource(DocLogin, "/auth/login")

class PatientUpload(Resource):
    @jwt_required()
    def post(self):
        data = request.json

        new_patient = Patient(
            name = data['name'],
            national_id = data['national_id'],
            date_of_birth = data['date_of_birth'],
            age = data['age'],
            last_appointment = data['last_appointment']
        )

        patient = Patient.query.filter(Patient.national_id == new_patient.national_id).first()

        if patient is not None:
            response = make_response(
                jsonify({"Error":"Patient Already Exists!!"}),409
            )
            return response
        db.session.add(new_patient)
        db.session.commit()

api.add_resource(PatientUpload, '/add-patient')


@app.route('/doc_data', methods=['GET'])
@jwt_required()
def get_doc_data():
    current_doc_id = get_jwt_identity()['doc_id']

    doc = Doc.query.filter_by(id=current_doc_id).first()

    if doc is None:
        return jsonify({'error': "Doctor not found!!"})
    
    doc_data = {
        'name' : doc.name,
    }
    return jsonify(doc_data), 200

@app.route('/get-patients', methods=['GET'])
@jwt_required()
def get_patients():
    patients = Patient.query.all()
    patient_list = [{
        'id': patient.id,
        'name': patient.name,
        'national_id': patient.national_id,
        'date_of_birth': patient.date_of_birth,
        'age': patient.age,
        'last_appointment': patient.last_appointment
    } for patient in patients]
    return jsonify(patient_list)



@app.route('/add-patient-record', methods=['POST'])
@jwt_required()
def add_patient_record():
    data = request.json
    patient_id = data.get('patient_id')
    
    patient = Patient.query.get(patient_id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    new_record = PatientRecord(
        Medical_allergies=data.get('Medical_allergies'),
        Medical_Conditions=data.get('Medical_Conditions'),
        Prescriptions=data.get('Prescriptions'),
        Surgeries_Procedures=data.get('Surgeries_Procedures'),
        patient_id=patient_id  # This assumes you've added a patient_id foreign key to PatientRecord
    )

    db.session.add(new_record)
    db.session.commit()

    return jsonify({"message": "Patient record added successfully"}), 201


class MedSummaryInfo(Resource):
    @jwt_required()
    def get(self, patient_id):
        patient = PatientRecord.query.filter_by(id=patient_id).first()
        if patient:
            summary = {
                'id': patient.id,
                'Medical_allergies': patient.Medical_allergies,
                'Medical_Conditions': patient.Medical_Conditions,
                'Prescriptions': patient.Prescriptions,
                'Surgeries_Procedures': patient.Surgeries_Procedures,
            }
            return jsonify(summary)
        return {'message': 'Patient not found'}, 404
api.add_resource(MedSummaryInfo, '/medsummaryinfo/<patient_id>')

if __name__ == '__main__':
    app.run(port=4040, debug=True)