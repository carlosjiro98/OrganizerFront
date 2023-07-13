import s from '../css/Zoho.module.css'
import '../css/App.css';
import React, { useEffect } from 'react';
import {NavLink, Routes, Route, useNavigate} from 'react-router-dom';
import ZohoClients from '../components/Zoho_views_components/ZohoClients';
import ZohoAccounts from '../components/Zoho_views_components/ZohoAccounts';

export default function Zoho() {
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/zoho/');
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <center className="fixed_main_container">

                <div className={s.title_links_container}>
                    <div className="links_zoho_container">
                        <NavLink to="/zoho/" end>
                            <div>
                                <p>Clients</p>
                            </div>
                        </NavLink>
                        <NavLink to="/zoho/accounts">
                            <div>
                                <p>Accounts</p>
                            </div>
                        </NavLink>
                    </div>
                    
                    <div className={s.hola}>
                        <h2>Zoho Center</h2>
                    </div>

                </div>
                

                <div>
                    <Routes>
                        <Route path="/" element={<ZohoClients />} />
                        <Route path="/accounts" element={<ZohoAccounts />} />
                    </Routes>
                </div>
            </center>
        </div>
    )
}