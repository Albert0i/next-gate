"use server"

export const M2M = async (direction, table, collection) => {
    let fromURI = ''
    let toURI = ''

    if (direction==='MySQL') {
        fromURI = `${process.env.API_URL}/mysql?table=${table}`
        toURI = `${process.env.API_URL}/mongodb?collection=${collection}`
    } else {
        fromURI = `${process.env.API_URL}/mongodb?collection=${collection}`
        toURI = `${process.env.API_URL}/mysql?table=${table}`
    }
       
    const resFrom = await fetch(fromURI, { cache: 'no-store' })
    if (resFrom.ok) {
        const dataFrom = await resFrom.json()
        const resTo = await fetch(toURI,
                            { 
                                method: 'POST',
                                headers: { "Content-type": "application/json", },
                                body: JSON.stringify(direction==='MySQL'?dataFrom.rows:dataFrom.docs) 
                            })
        if (resTo.ok) {
            const dataTo = await resTo.json()
            return dataTo 
        }
        else 
        {
            return resTo
        }
    }
    else 
    {
        return resFrom
    }
}

export const Mdelete = async (direction, table, collection) => {
    let apiURI = ''

    if (direction==='MySQL') {
        apiURI = `${process.env.API_URL}/mongodb?collection=${collection}`        
    } else {
        apiURI = `${process.env.API_URL}/mysql?table=${table}`        
    }
    console.log('apiURI=', apiURI)
    const res = await fetch(apiURI, { method: 'DELETE' })
    if (res.ok) {
        console.log('delete ok')
        const data = await res.json()
        return data
    }
    else {
        console.log('delete fail')
        console.log(res)
        return res
    }    
}
