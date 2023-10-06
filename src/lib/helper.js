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