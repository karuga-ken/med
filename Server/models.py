from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import LargeBinary

db = SQLAlchemy()

class Doc(db.Model):

    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __repr__(self):
        return f'{self.id}, {self.name}, {self.email}, {self.password}'


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String)
    date_of_birth = db.Column(db.Integer)
    age = db.Column(db.Integer)
    last_appointment = db.Column(db.Integer)
    records = db.relationship('PatientRecord', backref='patient', lazy=True)
    medrec = db.relationship('MedicalRecord', backref='patient', lazy=True)

    def __repr__(self):
        return f'{self.id}, {self.name}, {self.date_of_birth}, {self.age}, {self.last_appointment}'

class PatientRecord(db.Model):
    __tablename__ = 'medinfo'
    id = db.Column(db.Integer, primary_key=True)
    Medical_allergies = db.Column(db.String)
    Medical_Conditions = db.Column(db.String)
    Prescriptions = db.Column(db.String)
    Surgeries_Procedures = db.Column(db.String)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    # patient = db.relationship('Patient', backref=db.backref('records', lazy=True))
    
    def __repr__(self):
        return f'{self.id}, {self.Medical_allergies}, {self.Medical_Conditions}, {self.Prescriptions}, {self.Surgeries_Procedures}'

class MedicalRecord(db.Model):
    
    __tablename__ = 'medrecord'

    id = db.Column(db.Integer, primary_key = True)
    HospitalName = db.Column(db.String)
    PatientName = db.Column(db.String)
    DoctorName = db.Column(db.String)
    Date = db.Column(db.Date)
    MedicalReport = db.Column(LargeBinary)
    PatientId = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    def __repr__(self):
        return f'{self.id}, {self.HospitalName}, {self.PatientName}, {self.DoctorName}, {self.Date}, {self.MedicalReport}'

