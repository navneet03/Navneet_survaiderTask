from dbApi.review import *
from werkzeug.contrib.cache import SimpleCache
cache = SimpleCache()


class reviewDBService:
    def get_all_sentiment_of_parent(self):
        ret_data = cache.get('parent')
        if ret_data is None:
            positive_obj_list = UnitHotel.objects(sentiment="Positive").all()
            positive_count = len(positive_obj_list)
            negative_obj_list = UnitHotel.objects(sentiment="Negative").all()
            negative_count = len(negative_obj_list)
            neutral_obj_list = UnitHotel.objects(sentiment="Neutral").all()
            neutral_count = len(neutral_obj_list)
            ret_data = [positive_count, negative_count, neutral_count]
            cache.set('parent', ret_data, timeout=24 * 3600 * 60)
        return ret_data

    def get_all_sentiment_of_units(self, unit_property_id):
        ret_data = cache.get(unit_property_id)
        if ret_data is None:
            positive_count, negative_count, neutral_count =0, 0 ,0
            all_review_rating = []
            obj_list = UnitHotel.objects(property_id=unit_property_id).all()
            if obj_list:
                for obj in obj_list:
                    if obj.sentiment == "Positive":
                        positive_count += 1
                    elif obj.sentiment == "Negative":
                        negative_count += 1
                    elif obj.sentiment == "Neutral":
                        neutral_count += 1
                    all_review_rating.append([obj.review, str(obj.rating)])
            ret_data = [positive_count, negative_count, neutral_count, all_review_rating]
            cache.set(unit_property_id, ret_data, timeout=24 * 3600 * 60)
        return ret_data