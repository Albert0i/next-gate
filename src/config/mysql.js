import mysql from 'mysql2/promise';
import { convertToInsertSQL } from '@/lib/helper'

let connection = null; 

export const connectMySQL = async () => {
  try {    
    connection = await mysql.createConnection(process.env.MYSQL_URI)    
    console.log("Connected to MySQL.");
    return connection
  } catch (error) {
    console.log(error);
  }
};

export const queryMySQL = async (tabName, ommitKey='_id') => {
  const tempArray = process.env.MYSQL_URI.split('/')
  const dbName = tempArray[tempArray.length-1]
  const sql = `SELECT GROUP_CONCAT(c.column_name) as fields
  FROM information_schema.columns c 
  WHERE c.table_schema='${dbName}' and c.table_name='${tabName}' and 
        c.column_name not in ('${ommitKey}')`

  try {
    const [result, ] = await connection.query(sql);
    const [rows, ] = await connection.query(`SELECT ${result[0].fields} FROM ${tabName}`);
    return { success: true, rows }
  } catch (error) { 
    return { success: false, error }
  }
}

export const insertMySQL = async (tabName, rows) => {
  const [sql, arrayValue] = convertToInsertSQL(tabName, rows)
  
  try {
    const result = await connection.query(sql, [arrayValue], true)
    return { success: true, result }
  } catch (error) {
    return { success: false, error }
  } 
}

export const deleteMySQL = async (tabName) => {  
  try {
    const result = await connection.execute(`TRUNCATE TABLE ${tabName}`)
    return { success: true, result }
  } catch (error) {
    return { success: false, error }
  } 
}

export const closeMySQL = () => {
  if (connection)
    connection.close()
}

/*
   npm | mysql2
   https://www.npmjs.com/package/mysql2

   Bulk insert with mysql2 and NodeJs throws 500
   https://stackoverflow.com/questions/67672322/bulk-insert-with-mysql2-and-nodejs-throws-500

   Select all columns except one in MySQL?
   https://stackoverflow.com/questions/9122/select-all-columns-except-one-in-mysql
*/
