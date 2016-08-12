# !/usr/bin/python
# coding=utf-8
from flask import request
from flask_restful import Api, Resource
import json
import sys
reload(sys)
from dbApi.reviewDBService import *
from flaskApp.reviewRestApi import review_api
from flaskApp.app import app
review_api=Api(review_api)


class ReviewSentimentCount(Resource):
    def post(self):
        try:
            csv_fnm=""
            data = request.data
            data = json.loads(data)
            all_review_rating = []
            db_service = reviewDBService()

            if data["restaurant_type"] == "parent":
                f = open('static/csv/csv_data_parent' + '.csv', "wb+")
                col_name = 'Hotels' + ',' + 'Positive' + ',' + 'Negative' + ',' + 'Neutral' + '\n'
                f.write(col_name)
                csv_fnm = "csv_data_parent"
                all_sentiment_count = db_service.get_all_sentiment_of_parent()
                central = "Sterling Holiday Resorts" + ',' + str(all_sentiment_count[0]) + ',' + str(all_sentiment_count[1]) + ',' + \
                          str(all_sentiment_count[2]) + '\n'
                f.write(central)
                f.close()

            elif data["restaurant_type"] == "units1":
                f1 = open('static/csv/csv_data_unit1' + '.csv', "wb+")
                col_name = 'Hotels' + ',' + 'Positive' + ',' + 'Negative' + ',' + 'Neutral' + '\n'
                f1.write(col_name)
                csv_fnm = "csv_data_unit1"
                all_sentiment_count = db_service.get_all_sentiment_of_units("djpKvjWr1mxvMx2bjol")
                all_review_rating = all_sentiment_count[3]
                branchl = "Villagio Goa" + ',' + str(all_sentiment_count[0]) + ',' + str(all_sentiment_count[1]) + ',' + \
                          str(all_sentiment_count[2]) + '\n'
                f1.write(branchl)
                f1.close()

            elif data["restaurant_type"] == "units2":
                f1 = open('static/csv/csv_data_unit2' + '.csv', "wb+")
                col_name = 'Hotels' + ',' + 'Positive' + ',' + 'Negative' + ',' + 'Neutral' + '\n'
                f1.write(col_name)
                csv_fnm = "csv_data_unit2"
                all_sentiment_count = db_service.get_all_sentiment_of_units("KKQxWKm3JO7QyGxmdK3")
                all_review_rating = all_sentiment_count[3]
                branch2 = "White Mist Manali" + ',' + str(all_sentiment_count[0]) + ',' + str(all_sentiment_count[1]) + ',' + \
                          str(all_sentiment_count[2]) + '\n'
                f1.write(branch2)
                f1.close()

            elif data["restaurant_type"] == "units3":
                f1 = open('static/csv/csv_data_unit3' + '.csv', "wb+")
                col_name = 'Hotels' + ',' + 'Positive' + ',' + 'Negative' + ',' + 'Neutral' + '\n'
                f1.write(col_name)
                csv_fnm = "csv_data_unit3"
                all_sentiment_count = db_service.get_all_sentiment_of_units("gopKvoaDn2lnZK2AM5p")
                all_review_rating = all_sentiment_count[3]
                branch3 = "Dindi by the Godavari" + ',' + str(all_sentiment_count[0]) + ',' + str(
                    all_sentiment_count[1]) + ',' + str(all_sentiment_count[2]) + '\n'
                f1.write(branch3)
                f1.close()
            return {"csv_file_nm": csv_fnm,"all_review_rating": all_review_rating,"statusCode": 200}
        except Exception, e:
            app.logger.info(str(e) + " IN ReviewApi ")
            return {"data": "failure", "statusCode": 404}

review_api.add_resource(ReviewSentimentCount,'/review_sentiment_count')