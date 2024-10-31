import pymongo
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

client = pymongo.MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]
