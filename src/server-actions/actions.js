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
    
    console.log('fromURI=', fromURI)
    console.log('toURI=', toURI)
    const resFrom = await fetch(fromURI, { cache: 'no-store' })
    if (resFrom.ok) {
        console.log('from ok')
        const dataFrom = await resFrom.json()
        console.log('dataFrom=', dataFrom)
        const resTo = await fetch(toURI,
                            { 
                                method: 'POST',
                                headers: { "Content-type": "application/json", },
                                body: JSON.stringify(direction==='MySQL'?dataFrom.rows:dataFrom.docs) 
                            })
        if (resTo.ok) {
            console.log('to ok')
            const dataTo = await resTo.json()
            console.log('dataTo=', dataTo)
            return dataTo 
        }
        else 
        {
            //throw new Error('Server returned ' + res.status);
            return resTo
        }
    }
    else 
    {
        //throw new Error('Server returned ' + res.status);
        return resFrom
    }
}


// export const MongoDB2MySQL = async (srcCol, dstTable) => {
//     const res1 = await fetch(`${process.env.API_URL}/mongodb?collection=${srcCol}`,
//                             { cache: 'no-store' })
//     if (res1.ok) {
//         const data1 = await res1.json()
//         const res2 = await fetch(`${process.env.API_URL}/mysql?table=${dstTable}`,
//                             { 
//                                 method: 'POST',
//                                 headers: { "Content-type": "application/json", },
//                                 body: JSON.stringify(data1.result) 
//                             })
//         if (res2.ok) {
//             const data2 = await res2.json()
//             return data2 
//         }
//         else 
//         {
//             //throw new Error('Server returned ' + res1.status);
//             return { success: false, message: res1.status} 
//         }
//     }  
//     return false
// }
