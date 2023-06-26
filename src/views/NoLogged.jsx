import React from 'react';
import '../css/App.css'
import { SignInButton } from "../components/SignInButton";

export default function NoLogged() {
    return (
        <div className="noLogged_main_container">
            <center>
                <h1 className="welcome_txt">Welcome to your organized space!</h1>
                <p className="sgnin_txt">Pleas sign in with your Microsoft Account</p>
                <SignInButton />
            </center>
        </div>
    )
}