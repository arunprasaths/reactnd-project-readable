export const  formatDate = (timestamp) => {
    return  new Date(timestamp).toDateString()
}

export const ROOT_URL ='http://localhost:3001'
export const AUTH_HEADERS = {headers: { 'Authorization': 'whatever-you-want'}};

