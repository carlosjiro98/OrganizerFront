import React, { useState, useEffect } from 'react';
import { loginRequest } from '../helpers/authConfig';
import { usersPhotoFromGraph } from '../helpers/graph';
import { ProfileData } from '../components/ProfileData';
import Button from 'react-bootstrap/Button';
import { useUserContext, useGetUserContext, useContactsContext, useGetContactsContext } from '../Provider/GlobalProvider'
import { useMsal } from '@azure/msal-react';

import '../css/App.css';


/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {

    const graphData = useUserContext();
    const RequestProfileData = useGetUserContext();

    const { instance, accounts } = useMsal();
    const [photo, setPhoto] = useState(null);

    function RequestPhotoProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
            .then((response) => {
                usersPhotoFromGraph(response.accessToken, "69cb7105-13a3-4696-9a34-81d6a8c9723b").then((response) => {
                    console.log(response);
                    /*let urlPhoto = URL.createObjectURL(response.url);*/
                    setPhoto(response.url);
                    console.log("------- Photo -------");
                });
            });
    }

    return (
        <>
            {/*------------------------------------*/}
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                    <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
            <Button variant="secondary" onClick={RequestPhotoProfileData}>
                foto
            </Button>
            {photo && <img src={ photo } />}
            
        </>
    );
};
export default function Home() {
    return (
        <div className="fixed_main_container">
            <center>
                <h2>HOME</h2>
                <ProfileContent />
            </center>
        </div>
    )
}