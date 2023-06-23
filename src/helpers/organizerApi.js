

export async function getAllToDos() {

    const options = {
        method: "GET"
    };

    return fetch("https://organizer-app.azurewebsites.net/api/todoitems/", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function updateToDo(bodyx) {
    console.log(JSON.stringify(bodyx))
    const options = {
        method: "PUT",
        body: JSON.stringify(bodyx),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    return fetch(`https://organizer-app.azurewebsites.net/api/todoitems/${bodyx.id}`, options)
        .then(response => response)
        .catch(error => console.log(error));
}