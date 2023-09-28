import { MongoClient } from 'mongodb';

// Database Name
const dbName = 'testdb';
// Connection URL
const url=`mongodb://root:root@127.0.0.1:27017/${dbName}?authSource=admin`
const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db();
  const collection = db.collection('users');
  const users = await collection.find({}).toArray()

  return users;
}

main()
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => client.close());

/*
   npm | mongodb      
   https://www.npmjs.com/package/mongodb

   MongoServerSelectionError: connect ECONNREFUSED::1:27017
   https://blog.devgenius.io/mongoserverselectionerror-connect-econnrefused-1-27017-bee70efd1cac
*/