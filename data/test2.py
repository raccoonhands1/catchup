from pymongo import MongoClient

# Replace the URI string with your MongoDB deployment's connection string.
client = MongoClient('mongodb+srv://catchup:ZWf5JtpU68wEseJx@cluster0.l9jaw.mongodb.net/')
db = client['catchup']
collection = db['articles']

pipeline = [
    {
        "$unwind": "$tags"
    },
    {
        "$addFields": {
            "tag": {
                "name": "$tags"
            }
        }
    },
    {
        "$group": {
            "_id": None,
            "all_tags": {
                "$addToSet": "$tag"
            }
        }
    }
]


result = list(collection.aggregate(pipeline))

if result:
    combined_tags = result[0]['all_tags']
    print("Combined Tags:", combined_tags)
    tags_collection = db['tags']
    tags_collection.insert_many(combined_tags)

else:
    print("No tags found")
