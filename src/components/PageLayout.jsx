/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import {Navbar, Container} from "react-bootstrap";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

import '../css/App.css';


/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    /*console.log(accounts);*/

    return (
        <>
            <Navbar expand="lg" variant="dark" className="nav_container">
                <Container>
                    <a className="navbar-brand lol"  href="/">
                        ORGANIZER
                    </a>
                    <div className="navOptions_container">

                        {isAuthenticated && <h5>{accounts[0].name}</h5>}
                        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                    </div>
                </Container>
            </Navbar>

            {props.children}

        </>
    );
};
//style={{ color: "red", fontSize: "2rem" }}