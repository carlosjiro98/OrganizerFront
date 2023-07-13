import React, { useEffect, useState } from 'react';
import {zohoGet} from '../../helpers/zohoApi';
import CardMapper from './CardMapper';
import {PopUpCreate} from './PopUpCreate';
import '../../css/App.css';


export default function ZohoAccounts() {

    const [data, setData] = useState(null);
    useEffect(()=>{
        //generateToken();
        async function lol () {
            let accountsFromZoho = await zohoGet("accounts");
            setData(accountsFromZoho.data);
        }
        lol();
    }, [])

    async function updateState () {
        setData(null);
        let contactsFromZoho = await zohoGet("accounts");
        setData(contactsFromZoho.data);
    } 


    return (
        <div>
            <center>
                <div>
                    <div className='zoho_title_btn'>
                        <h2>Acconuts</h2>
                        <PopUpCreate updateState={updateState} viewFrom="accounts" />
                    </div>

                    <CardMapper data={data}  />
                </div>
            </center>
        </div>
    )
}