"use server"
export const MongoDB2MySQL = async (srcCol, dstTable) => {        
    const res1 = await fetch(`${process.env.API_URL}/mongodb?collection=${srcCol}`,
                            { cache: 'no-store' })
    if (res1.ok) {
        const data1 = await res1.json()
        const res2 = await fetch(`${process.env.API_URL}/mysql?table=${dstTable}`,
                            { 
                                method: 'POST',
                                headers: { "Content-type": "application/json", },
                                body: JSON.stringify(data1.result) 
                            })
        if (res2.ok) {
            const data2 = await res2.json()
            return data2 
        }
        else 
        {
            //throw new Error('Server returned ' + res1.status);
            return { success: false, message: res1.status} 
        }
    }  
    return false
}

export const MySQL2MongoDB2 = async (srcTable, dstCol) => {
    
}
