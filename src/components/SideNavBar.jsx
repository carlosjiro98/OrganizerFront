import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/App.css';
import { useGetUserContext, useGetContactsContext, useGetAllToDosContext } from '../Provider/GlobalProvider';


export default function SideNavar() {

    const RequestProfileData = useGetUserContext();
    const RequestContactsData = useGetContactsContext();
    const RequestAllToDosData = useGetAllToDosContext();

    useEffect(() => {
        RequestContactsData();
        RequestProfileData();
        RequestAllToDosData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="side_main_container">
            <div className="links_container">
                <NavLink to="/">
                    <div>
                        <h3>Home</h3>
                    </div>
                </NavLink>
                <NavLink to="/contacts">
                    <div>
                        <h3>Contacts</h3>
                    </div>
                </NavLink>
                <NavLink to="/todo">
                    <div>
                        <h3>Todo</h3>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
/*
const { getSomething } = useCustomHook()

useEffect(()=>{
    getSomething()
  },[])
*/