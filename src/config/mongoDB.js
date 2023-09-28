import { MongoClient } from 'mongodb';

let client = null; 

export const connectMongoDB = async () => {
  try {    
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB.");
    return client
  } catch (error) {
    console.log(error);
  }
};

export const queryMongoDB = async (colName) => {
  const db = client.db();
  const collection = db.collection(colName);

  const result = await collection.find({}, {projection: {_id: 0, __v: 0}} ).toArray()
  return result
}

export const executeMongoDB = async (colName, documents) => {
  const db = client.db();
  const collection = db.collection(colName);
  
  const result = await collection.insertMany(documents)
  return result
}

export const closeMongoDB = () => {
  if (client)
    client.close()
}

/*
   npm | mongodb      
   https://www.npmjs.com/package/mongodb

   MongoServerSelectionError: connect ECONNREFUSED::1:27017
   https://blog.devgenius.io/mongoserverselectionerror-connect-econnrefused-1-27017-bee70efd1cac

   How to do field selection on find() in the mongodb native driver?
   https://stackoverflow.com/questions/20998238/how-to-do-field-selection-on-find-in-the-mongodb-native-driver
*/
