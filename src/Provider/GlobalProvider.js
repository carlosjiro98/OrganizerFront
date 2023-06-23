import React, { createContext, useState, useContext } from 'react';
import { loginRequest } from '../helpers/authConfig';
import { callMsGraph, usersFromGraph } from '../helpers/graph';
import { useMsal } from '@azure/msal-react';
import '../css/App.css';
import { getAllToDos } from '../helpers/organizerApi';

//Creating contexts
const userContext = createContext();
const getUserContext = createContext();
const contactsContext = createContext();
const getContactsContext = createContext();
const allToDosContext = createContext();
const getAllToDosContext = createContext();

//Todos data funtions
export function useAllToDosContext() {
    return useContext(allToDosContext);
}
export function useGetAllToDosContext() {
    return useContext(getAllToDosContext);
}

//User data functions
export function useUserContext() {
    return useContext(userContext);
}

export function useGetUserContext() {
    return useContext(getUserContext);
}
//Contacts data functions
export function useContactsContext() {
    return useContext(contactsContext);
}
export function useGetContactsContext() {
    return useContext(getContactsContext);
}

//Provider function
export function GlobalProvider({ children }) {
    const { instance, accounts } = useMsal();
    //graph states
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState(null);
    //todos states
    const [allToDos, setAllToDos] = useState(null);

    //AllTodos
    async function RequestAllToDos() {
        setAllToDos(null);
        let toDosList = await getAllToDos();
        /*console.log(toDosList);*/
        setAllToDos(toDosList);
    }

    //USER
    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => {
                    setUser(response);
                    //console.log("------- Users -------");
                    //console.log(response);
                });
            });
    }

    //CONTACTS
    function RequestContactsleData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
            .then((response) => {
                usersFromGraph(response.accessToken).then((response) => {
                    setContacts(response.value);
                    //console.log("------- Contacts --------");
                    //console.log(response.value);

                });
            });
    }



    return (
        <userContext.Provider value={user}>
            <getUserContext.Provider value={RequestProfileData}>
                <contactsContext.Provider value={contacts}>
                    <getContactsContext.Provider value={RequestContactsleData}>
                        <allToDosContext.Provider value={allToDos}>
                            <getAllToDosContext.Provider value={RequestAllToDos}>
                                {children}
                            </getAllToDosContext.Provider>
                        </allToDosContext.Provider>
                    </getContactsContext.Provider>
                </contactsContext.Provider>
            </getUserContext.Provider>
        </userContext.Provider>
    );
}






