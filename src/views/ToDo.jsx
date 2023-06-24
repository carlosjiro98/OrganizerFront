import '../css/App.css'
import React from 'react';
import ListContainer from '../components/ListContainer';


export default function ToDo() {
    
    

    return (
        <div>
            <center className="fixed_main_container">
                <h2>ToDo List</h2>
                
                <ListContainer />
                
            </center>
        </div>
    )
}