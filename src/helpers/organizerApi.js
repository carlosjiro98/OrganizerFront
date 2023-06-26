
//------------------- GET ALL -------------------------
export async function getAllToDos() {

    const options = {
        method: "GET"
    };

    return fetch("https://organizer-app.azurewebsites.net/api/todoitems/", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
//------------------- UPDATE TODO -------------------------
export async function updateToDo(bodyx) {

    const options = {
        method: "PUT",
        body: JSON.stringify(bodyx),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    return fetch(`https://organizer-app.azurewebsites.net/api/todoitems/${bodyx.id}`, options)
        .then(response => response)
        .catch(error => console.log(error));
}
//------------------- DELETE TODO -------------------------
export async function deleteToDo(id) {

    const options = {
        method: "DELETE"
    }

    return fetch(`https://organizer-app.azurewebsites.net/api/todoitems/${id}`, options)
        .then(response => response)
        .catch(error => console.log(error));
}

//------------------- POST TODO -------------------------

export async function postToDo(body) {

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    return fetch(`https://organizer-app.azurewebsites.net/api/todoitems/`, options)
        .then(response => response)
        .catch(error => console.log(error));
}