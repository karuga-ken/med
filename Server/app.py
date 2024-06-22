from flask import Flask, request, make_response, jsonify
from models import db, Doc
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///med.db'
api=Api(app)
db.init_app(app)
migrate = Migrate(app,db)



CORS(app)

class RegisterDoc(Resource):
    def post(self):
        # obtaining data from the form in front-end
        data = request.form

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
api.add_resource(RegisterDoc, "/auth/registerdoctors")


if __name__ == '__main__':
    app.run(port=4040, debug=True)