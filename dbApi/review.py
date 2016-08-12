from flaskApp.app import db


class UnitHotel(db.Document):
    property_id = db.StringField(required=True)
    rating = db.DecimalField(required=True)
    review = db.StringField(required=True)
    sentiment = db.StringField(max_length=50)
    review_link = db.URLField()