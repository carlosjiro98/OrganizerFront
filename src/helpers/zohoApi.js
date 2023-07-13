
//-------- GET Contacts/Accouns
export async function zohoGet(param) {

    const options = {
        method: "GET",
        // headers: {
        //     'Content-Type': 'application/json',
        //     "Access-Control-Allow-Origin": "*",
        //     "Authorization": `Zoho-oauthtoken ${token}`,
        // }
    }

    return fetch(`https://organizer-app.azurewebsites.net/zoho/${param}`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//-------- POST new Contacts/Accouns
export async function zohoPostContacts(body, param) {

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    return fetch(`https://organizer-app.azurewebsites.net/zoho/${param}`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}