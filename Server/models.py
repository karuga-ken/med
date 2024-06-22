from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Doc(db.Model):

    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __repr(self):
        return f'{self.id}, {self.name}, {self.email}, {self.password}'
