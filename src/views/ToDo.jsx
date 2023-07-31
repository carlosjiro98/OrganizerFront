import '../css/App.css'
import React from 'react';
import ListContainer from '../components/Todo_components/ListContainer';
import { useEffect } from 'react';
import { useGetAllToDosContext } from '../Provider/GlobalProvider';

function ToDox() {

    const RequestAllToDosData = useGetAllToDosContext();

    useEffect(() => { 
        RequestAllToDosData(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    return (
        <div>
            <center className="fixed_main_container">
                <h2>ToDo List</h2>
                
                <ListContainer />
                
            </center>
        </div>
    )
}

export default function ToDo() {

    return (
        <div>
            <center className="fixed_main_container">
                <h2>Temporarily disabled</h2>
            </center>
        </div>
    )
}