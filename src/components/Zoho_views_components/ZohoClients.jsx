import React, { useEffect, useState } from 'react';
import {zohoGet} from '../../helpers/zohoApi';
import CardMapper from './CardMapper';
import {PopUpCreate} from './PopUpCreate';

export default function ZohoClients() {

    const [data, setData] = useState(null);
    useEffect(()=>{
        //generateToken();
        async function lol () {
            let contactsFromZoho = await zohoGet("clients");
            setData(contactsFromZoho.data);
        }
        lol();
    }, [])

    async function updateState () {
        setData(null);
        let contactsFromZoho = await zohoGet("clients");
        setData(contactsFromZoho.data);
    } 

    return (
        <div>
            <center>
                <div>
                    
                    <div className='zoho_title_btn'>
                        <h2>Clients</h2>
                        <PopUpCreate updateState={updateState} viewFrom="clients" />
                    </div>
                    <CardMapper data={data}  />
                </div>
            </center>
        </div>
    )
}