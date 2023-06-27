import { useUserContext } from '../Provider/GlobalProvider';
import { ProfileData } from '../components/ProfileData';
import React from 'react';
import '../css/App.css';
import { ContactIcon } from '@fluentui/react-icons-mdl2';


const ProfileContent = () => {

    const graphData = useUserContext();

    return (
        <>
            <div className="home_first_container">
                <div className="welcome_cotainer">
                    <h2>Welcome {graphData && graphData.data.givenName}</h2>
                </div>
                <div className="profile_photo_container">
                    {graphData ? <img src={graphData.photo} alt="User Profile" />: <ContactIcon />}
                </div>
            </div>

            {graphData ?  <ProfileData graphData={graphData.data} /> : <h1>Hola</h1> }
            
        </>
    );
};
export default function Home() {
    return (
        <div className="fixed_main_container">
            <center>
                <ProfileContent />
            </center>
        </div>
    )
}