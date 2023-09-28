import mysql from 'mysql2/promise';

// Use createConnection method to connect to the server
// const connection = await mysql.createConnection({
//   host:'localhost', 
//   user: 'root', 
//   password: 'root', 
//   database: 'employees'
// });
// Database Name
const dbName = 'employees';
const connection = await mysql.createConnection(`mysql://root:root@localhost:3306/${dbName}`)

async function main() {  
    // query database
    const results = await connection.query('SELECT * FROM titles');
    return results
  }

main()
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(()=> connection.close())

/*
   npm | mysql2
   https://www.npmjs.com/package/mysql2
*/