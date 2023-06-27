import '../css/App.css'
import React from 'react';
import ListContainer from '../components/ListContainer';
import { useEffect } from 'react';
import { useGetAllToDosContext } from '../Provider/GlobalProvider';

export default function ToDo() {

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