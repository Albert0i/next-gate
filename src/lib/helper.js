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
        
        rows.map(row => {
            arrayValue.push(Object.values(row))
        }) 
        return [sql, arrayValue] 
    }
  }