// Obtiene la lista de grupos disponibles en el tenant
export async function getWorkGroups(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://graph.microsoft.com/v1.0/groups", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Obtienes los plans del grupo seleccionado
export async function getPlansFromGroup(accessToken, id) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/groups/${id}/planner/plans`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Obtiene la lista de buckets de un plan
export async function getBucketsFromPlan(accessToken, id) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/plans/${id}/buckets`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Obtiene la lista de tasks del plan
export async function getTasksFromPlan(accessToken, id) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/plans/${id}/tasks`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Crea una tarea
export async function createTask(accessToken, body) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json"); 

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/tasks`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
//patch task
export async function patchTask(accessToken, body, etag, id) {

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json"); 
    headers.append("Prefer", "return=representation");
    headers.append("If-Match", etag);

    const options = {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/tasks/${id}`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}


//Get task detail
export async function getTaskDetail(accessToken, id) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/tasks/${id}/details`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Patch task detail
export async function patchTaskDetail(accessToken, body) {
    //console.log(body);
    const etag = body['@odata.etag']
    //console.log(etag)

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json"); 
    headers.append("Prefer", "return=representation");
    headers.append("If-Match", etag);

    const options = {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/tasks/${body.id}/details`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Patch New task detail
export async function patchNewTaskDetail(accessToken, body, etag, id) {


    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json"); 
    headers.append("Prefer", "return=representation");
    headers.append("If-Match", etag);

    const options = {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/tasks/${id}/details`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

//Crea un bucket
export async function createBucket(accessToken, body) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json"); 

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers
    };

    return fetch(`https://graph.microsoft.com/v1.0/planner/buckets`, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

/* 
Get task detail
https://graph.microsoft.com/v1.0/planner/tasks/7ZaYDvFVsE6bH66OBmubbGUAJj5Z/details

Patch task detail
https://graph.microsoft.com/v1.0/planner/tasks/7ZaYDvFVsE6bH66OBmubbGUAJj5Z/details
headers: 
Content-type: application/json
Prefer: return=representation
If-Match: "JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="

 */