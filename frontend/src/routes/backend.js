export async function post({params, body}) 
{
    const response = await fetch("http://localhost:4000/graphql", 
    {
        method: "POST",
        body: body,
        headers: 
        {
            'Content-Type': 'application/graphql'
        }
    })

    const data = await response.json()

    return {
        body: data
    }
}

export async function get({params})
{
    return {
        body:
        {
            data: "backend found"
        }
    }
}