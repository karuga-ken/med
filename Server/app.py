from flask import Flask, request, make_response, jsonify, send_file, abort
from models import db, Doc, Patient, PatientRecord, MedicalRecord, Appointment
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, date, timedelta
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
import os
import io
from dateutil import parser

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///med.db'
database_url = os.environ.get('DATABASE_URL', 'sqlite:///med.db')
api=Api(app)
db.init_app(app)
migrate = Migrate(app,db)
jwt=JWTManager(app)
CORS(app)
CORS(app, resources={r"/addappointment": {"origins": "http://localhost:3000"}})  # Allow specific origin
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

            # Convert timestamp to date object
            birth_timestamp = int(data["date_of_birth"])
            date_of_birth = date.fromtimestamp(birth_timestamp)

            # Convert last_appointment if it's also a timestamp
            last_appointment = date.fromtimestamp(int(data['last_appointment'])) if data['last_appointment'] else None

            new_patient = Patient(
                name=data['name'],
                national_id=int(data['national_id']),
                date_of_birth=date_of_birth,
                age=int(data["age"]),
                last_appointment=last_appointment
            )

            patient = Patient.query.filter(Patient.national_id == new_patient.national_id).first()

            if patient is not None:
                return make_response(jsonify({"error": "Patient Already Exists!!"}), 409)

            db.session.add(new_patient)
            db.session.commit()

            return make_response(jsonify({"message": "Patient added successfully"}), 201)

      
api.add_resource(PatientUpload, '/add-patient')

# class PatientUpload(Resource):
#     @jwt_required()
#     def post(self):
#         data = request.json

#         date = datetime.strptime(data["date_of_birth"], '%Y-%m-%d').date()

#         new_patient = Patient(
#             name = data['name'],
#             national_id = int(data['national_id']),
#             date_of_birth = date,
#             age = int(data["age"]),
#             last_appointment = data['last_appointment']
#         )

#         patient = Patient.query.filter(Patient.national_id == new_patient.national_id).first()

#         if patient is not None:
#             response = make_response(
#                 jsonify({"Error":"Patient Already Exists!!"}),409
#             )
#             return response
#         db.session.add(new_patient)
#         db.session.commit()

# api.add_resource(PatientUpload, '/add-patient')


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

# @app.route('/get-patients', methods=['GET'])
# @jwt_required()
# def get_patients():
#     patients = Patient.query.all()
#     patient_list = [{
#         'id': patient.id,
#         'name': patient.name,
#         'national_id': patient.national_id,
#         'date_of_birth': patient.date_of_birth,
#         'age': patient.age,
#         'last_appointment': patient.last_appointment
#     } for patient in patients]
#     return jsonify(patient_list)

@app.route('/get-patients', methods=['GET'])
@jwt_required()
def get_patients():
    patients = Patient.query.all()
    patient_list = [{
        'id': patient.id,
        'name': patient.name,
        'national_id': patient.national_id,
        'date_of_birth': patient.date_of_birth.isoformat() if patient.date_of_birth else None,
        'age': patient.age,
        # 'last_appointment': patient.last_appointment.isoformat() if patient.last_appointment else None
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

class MedRec(Resource):
    @jwt_required()
    def post(self):

        Hospital = request.form.get('Hospital')
        PatientName = request.form.get('PatientName')
        DrName = request.form.get('DrName')
        Date = request.form.get('Date')
        medical_record = request.files.get('file')
        patientID = request.form.get('PatientID')

        if not medical_record:
            return "please select record", 400
        
        date = datetime.strptime(Date, '%Y-%m-%d').date()
        
        new_record = MedicalRecord(
            HospitalName = Hospital,
            PatientName = PatientName,
            DoctorName = DrName,
            Date = date,
            MedicalReport = medical_record.read(),
            PatientId = patientID
        )

        db.session.add(new_record)
        db.session.commit()

        return "Medical Record added succssfully", 201
    
api.add_resource(MedRec, '/add')

class PatientRecords(Resource):
    @jwt_required()
    def get(self, patient_id):
        try:
            records = MedicalRecord.query.filter_by(PatientId=patient_id).all()
            
            if not records:
                return {"message": "No records found for this patient"}, 404
            
            records_data = []
            for record in records:
                record_data = {
                    "id": record.id,
                    "hospital_name": record.HospitalName,
                    "patient_name": record.PatientName,
                    "doctor_name": record.DoctorName,
                    "date": record.Date.isoformat() if record.Date else None,
                    "has_file": bool(record.MedicalReport)
                }
                records_data.append(record_data)
            
            return jsonify(records_data)
        
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500

api.add_resource(PatientRecords, '/records/<int:patient_id>')

class MedicalRecordDownload(Resource):
    @jwt_required()
    def get(self, record_id):
        record = MedicalRecord.query.get_or_404(record_id)
        
        # Verify the data type of the MedicalReport
        print(type(record.MedicalReport))
        
        try:
            # Create a watermark
            watermark = self.create_watermark("Doctor's Portal Download")

            # Read the original PDF
            existing_pdf = PdfReader(BytesIO(record.MedicalReport))
            output = PdfWriter()

            # Add the watermark to each page
            for i in range(len(existing_pdf.pages)):
                page = existing_pdf.pages[i]
                page.merge_page(watermark.pages[0])
                output.add_page(page)

            # Save the result to a memory buffer
            buffer = BytesIO()
            output.write(buffer)
            buffer.seek(0)
            
            return send_file(
                buffer,
                mimetype='application/pdf',
                as_attachment=True,
                download_name=f'medical_record_{record_id}.pdf'
            )
        except Exception as e:
            print(f"Error processing PDF: {str(e)}")
            return {"message": "Error processing PDF"}, 500

    @staticmethod
    def create_watermark(text):
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        packet = BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        can.setFont("Helvetica", 20)
        can.setFillColorRGB(86/255, 67/255, 204/255) 
        can.saveState()
        can.translate(300, 400)
        can.rotate(45)
        can.drawCentredString(0, 0, text)
        can.restoreState()
        can.save()
        packet.seek(0)
        return PdfReader(packet)

# Add the resource to your API
api.add_resource(MedicalRecordDownload, '/api/medical-records/<int:record_id>/download')

class PatientSign(Resource):
    def post(self):

        data=request.json
        
        
        date = datetime.strptime(data["birth"], '%Y-%m-%d').date()

        new_patient = Patient(
            name = data["name"],
            national_id = int(data["national"]),
            date_of_birth = date,
            age = int(data["age"]),
            password = data["password"],
            email = data['email']
        )
        

        patient = Patient.query.filter(Patient.national_id == new_patient.national_id ).first()

        if patient is not None:
            response = make_response(
                jsonify({
                    "message": "account already exists, set new password to access"
                }), 409
            )
            return response
        
        db.session.add(new_patient)
        db.session.commit()

        access_token_payload = {
            "patient_id": new_patient.id,
            "patient_name": new_patient.name
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
api.add_resource(PatientSign, "/patientsignup")

class PatientLogin(Resource):
    def post (self):

        national = request.json['national']
        password = request.json['password']

        patient_exists = Patient.query.filter(Patient.national_id == national).first()
        if patient_exists is None:
            response = make_response(
                jsonify({
                    "error": "Account not found"
                }), 401
            )
            return response
        password_exists = Patient.query.filter(Patient.password == password).first()

        if password_exists is None:
            response = make_response(
                jsonify({
                    "error": 'Wrong credentials'
                }), 401
            )
            return response
        
        access_token_payload = {
            "message": "login successful",
            "patient_id": patient_exists.id,
            "doc_name": patient_exists.name,
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
api.add_resource(PatientLogin, "/auth/patientlogin")

class PatientMedrec(Resource):
    @jwt_required()
    def get(self):

        current_patient = get_jwt_identity()["patient_id"]

        patientrecords = MedicalRecord.query.filter(current_patient == MedicalRecord.PatientId).all()

        if patientrecords is None:
            return jsonify({
                "message": "You have No records!"
            })
        records_list = []
        for patientrecord in patientrecords:
            patient_data = {
                "id": patientrecord.id,
                "hospital_name": patientrecord.HospitalName,
                "doctor_name": patientrecord.DoctorName,
                "date": patientrecord.Date.isoformat() if patientrecord.Date else None,
                "has_file": bool(patientrecord.MedicalReport)
            }
            records_list.append(patient_data)
        return jsonify(records_list)
        
api.add_resource(PatientMedrec, '/patrecords')


class MedicalReportDownload(Resource):
    @jwt_required()
    def get(self, record_id):
        current_patient = get_jwt_identity()["patient_id"]
        
        # Fetch the record
        record = MedicalRecord.query.filter_by(id=record_id, PatientId=current_patient).first()
        
        if not record:
            abort(404, description="Record not found or you don't have permission to access it.")
        
        if not record.MedicalReport:
            abort(404, description="No medical report file found for this record.")
        
        try:
            # Create a watermark
            watermark = self.create_watermark("Patient Portal Download")

            # Read the original PDF
            existing_pdf = PdfReader(BytesIO(record.MedicalReport))
            output = PdfWriter()

            # Add the watermark to each page
            for i in range(len(existing_pdf.pages)):
                page = existing_pdf.pages[i]
                page.merge_page(watermark.pages[0])
                output.add_page(page)

            # Save the result to a memory buffer
            buffer = BytesIO()
            output.write(buffer)
            buffer.seek(0)
            
            # Generate a filename
            filename = f"medical_report_{record.id}.pdf"
            
            return send_file(
                buffer,
                mimetype='application/pdf',
                as_attachment=True,
                download_name=filename
            )
        except Exception as e:
            print(f"Error processing PDF: {str(e)}")
            return {"message": "Error processing PDF"}, 500

    @staticmethod
    def create_watermark(text):
        packet = BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        can.setFont("Helvetica", 20)
        can.setFillColorRGB(0.5, 0.5, 0.5, 0.3) 
        can.saveState()
        can.translate(300, 400)
        can.rotate(45)
        can.drawCentredString(0, 0, text)
        can.restoreState()
        can.save()
        packet.seek(0)
        return PdfReader(packet)

api.add_resource(MedicalReportDownload, '/download_report/<int:record_id>')

class GetDocs(Resource):
    def get(self):
        doctors = Doc.query.all()
        return([{'id':doc.id, 'name': doc.name}for doc in  doctors])
api.add_resource(GetDocs, '/searchdoc')


class AddAppointment(Resource):
    @jwt_required()
    def post(self):
        try:
            logged_in_user = get_jwt_identity().get('patient_id')
            data = request.get_json()  

            if not all(d in data for d in ('doctorId', 'date', 'time')):
                return jsonify({"message": "Missing data"}), 400

            doctor_id = int(data.get('doctorId'))  # Convert to integer
            date_str = data.get('date')
            time_str = data.get('time')

            # Validate and convert date and time
            try:
                date = datetime.strptime(date_str, '%Y-%m-%d').date()
                time = datetime.strptime(time_str, '%H:%M').strftime('%H:%M')  # Convert time to string
            except ValueError as ve:
                return jsonify({"message": f"Invalid date/time format: {ve}"}), 400

            # Check if the appointment already exists
            existing_appointment = Appointment.query.filter_by(
                doctor_id=doctor_id,
                date=date,
                time=time,  
                patient_id=logged_in_user
            ).first()

            if existing_appointment:
                return jsonify({"message": "Appointment already exists"}), 422

            new_appointment = Appointment(
                doctor_id=doctor_id,
                patient_id=logged_in_user,
                date=date,
                time=time 
            )

            db.session.add(new_appointment)
            db.session.commit()

            response_data = {
                'id': new_appointment.id,
                'doctorId': new_appointment.doctor_id,
                'doctorName': new_appointment.doctor.name,
                'start': datetime.combine(new_appointment.date, datetime.strptime(new_appointment.time, '%H:%M').time()).isoformat(),
                'end': (datetime.combine(new_appointment.date, datetime.strptime(new_appointment.time, '%H:%M').time()) + timedelta(hours=1)).isoformat()
            }

            return jsonify(response_data), 201

        except Exception as e:
            db.session.rollback()
            print(f"Error adding appointment: {e}")
            return jsonify({"message": f"Error adding appointment: {e}"}), 500
api.add_resource(AddAppointment, '/addappointment')

class BookedAppointment(Resource):
    @jwt_required()
    def get(self):
        try:
            logged_in_user = get_jwt_identity()
            patient_id = logged_in_user['patient_id']

            appointments = db.session.query(Appointment, Doc.name).\
                join(Doc, Appointment.doctor_id == Doc.id).\
                filter(Appointment.patient_id == patient_id).\
                all()

            response_data = []

            for appointment, doctor_name in appointments:
                appointment_data = {
                    'id': appointment.id,
                    'doctorName': doctor_name,
                    'start': datetime.combine(appointment.date, datetime.strptime(appointment.time, '%H:%M').time()).isoformat(),
                    'end': (datetime.combine(appointment.date, datetime.strptime(appointment.time, '%H:%M').time()) + timedelta(hours=1)).isoformat()
                }
                response_data.append(appointment_data)

            return {'appointments': response_data}, 200

        except Exception as e:
            print(f'Error retrieving appointments: {e}')
            return jsonify({'message': f'error retrieving appointments'}), 500
        
api.add_resource(BookedAppointment, '/getbookedappointments')

class DocAppointment(Resource):
    @jwt_required()
    def get(self):
        try:

            logged_in_user = get_jwt_identity()
            logged_doc = logged_in_user['doc_id']

            appointments = db.session.query(Appointment, Patient.name).\
                    join(Patient, Appointment.patient_id == Patient.id).\
                    filter(Appointment.doctor_id == logged_doc).\
                    all()

            response_data = []

            for appointment, patient_name in appointments:
                    appointment_data = {
                        'id': appointment.id,
                        'doctorName': patient_name,
                        'start': datetime.combine(appointment.date, datetime.strptime(appointment.time, '%H:%M').time()).isoformat(),
                        'end': (datetime.combine(appointment.date, datetime.strptime(appointment.time, '%H:%M').time()) + timedelta(hours=1)).isoformat()
                    }
                    response_data.append(appointment_data)

            return {'appointments': response_data}, 200
        
        except Exception as e:
            print(f'Error retrieving appointments: {e}')
            return jsonify({'message': f'error retrieving appointments'}), 500
    
api.add_resource(DocAppointment, '/patientappointments')
        
    


        

if __name__ == '__main__':
    app.run(port=4040, debug=True)