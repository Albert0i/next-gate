/*
   How to get all query string parameters as an object in JavaScript
   https://attacomsian.com/blog/javascript-convert-query-string-to-object
*/
export const URLSearchParams2Json = (params) => 
{
  const obj = {}
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key)
    } else {
      obj[key] = params.get(key)
    }
  }
  return obj
}

/*
   Bulk insert with mysql2 and NodeJs throws 500
   https://stackoverflow.com/questions/67672322/bulk-insert-with-mysql2-and-nodejs-throws-500
*/
  export const convertToInsertSQL = (table, rows) => {
    let sql = ''
    let fields = ''
    let arrayValue = []
  
    if (rows.length===0)
        return ['', ''];
    else {
        Object.keys(rows[0]).map(key => {
            if (fields!=='') fields += ', '
            fields += key
        })
        sql = `INSERT INTO ${table} (${fields}) VALUES ?;`
        
        let newRow = []
        rows.map(row => {
          console.log('row=', row)
          //arrayValue.push(Object.values(row))
          newRow = Object.values(row).map( value => {            
            if (isIsoDate(value)) {
                return `STR_TO_DATE('${value}','%Y-%m-%dT%H:%i:%s.%fZ')`
            }
            else {
                return value
            }
          })
          arrayValue.push(newRow)
        })
        console.log('sql=', sql)
        console.log('arrayValue=', arrayValue)
        return [sql, arrayValue] 
    }
  }

/*
   Check if a date string is in ISO and UTC format
   https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
*/
function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str); 
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===str; // valid date 
}

/*
   How to validate timestamp in javascript
   https://stackoverflow.com/questions/12422918/how-to-validate-timestamp-in-javascript
*/
// export function isValidTimestamp(_timestamp) {
//     const newTimestamp = new Date(_timestamp).getTime();
//     return isNumeric(newTimestamp);
// }

// export function isNumeric(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

/*
   convert string to datetime in my sql [duplicate]
   https://stackoverflow.com/questions/44802061/convert-string-to-datetime-in-my-sql
*/

// if (isValidTimestamp(Object.values(row)))
// {
//   arrayValue.push(`STR_TO_DATE('${Object.values(row)}','%Y-%m-%dT%H:%i:%s.%fZ')`)
// }              
// else 
// {
//   arrayValue.push(Object.values(row))
// }

/*
code
: 
"ER_TRUNCATED_WRONG_VALUE"
errno
: 
1292
message
: 
"Incorrect datetime value: 'STR_TO_DATE('2023-10-06T08:26:35.000Z','%Y-%m-%dT%H:%i:%s.%f')' for column 'createdAt' at row 1"
sql
: 
"INSERT INTO users (_id, age, createdAt, isAdmin, name, updatedAt) VALUES ('651fc823d4fedbe135a9337e', 26, 'STR_TO_DATE(\\'2023-10-06T08:26:35.000Z\\',\\'%Y-%m-%dT%H:%i:%s.%f\\')', 0, 'Kyle', NULL), ('651fc823d4fedbe135a9337f', 27, 'STR_TO_DATE(\\'2023-10-06T08:26:35.000Z\\',\\'%Y-%m-%dT%H:%i:%s.%f\\')', 0, 'Sally', NULL), ('651fc823d4fedbe135a93380', 33, 'STR_TO_DATE(\\'2022-10-05T23:16:37.000Z\\',\\'%Y-%m-%dT%H:%i:%s.%f\\')', 1, 'Dave', NULL);"
sqlMessage
: 
"Incorrect datetime value: 'STR_TO_DATE('2023-10-06T08:26:35.000Z','%Y-%m-%dT%H:%i:%s.%f')' for column 'createdAt' at row 1"
sqlState
: 
"22007"
*/