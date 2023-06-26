import React from "react";
//trying fluentUI
import { PopupModalExample } from './PopUpInfo.jsx';
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */
export const ProfileData = (props) => {
    return (
        <div id="profile-div" >
            <center>
                <h3>User Detail</h3>
            </center>
            <div className="profile_container">
                <div className="data_sub1">
                    <p>
                        <strong>Full Name: </strong> {props.graphData.displayName}
                    </p>
                    <p>
                        <strong>JobTitle: </strong> {props.graphData.jobTitle}
                    </p>
                    <p>
                        <strong>Email: </strong> {props.graphData.userPrincipalName}
                    </p>
                </div>
                <div className="data_sub2">
                    <p>
                        <strong>Id: </strong> {props.graphData.id}
                    </p>
                    <p>
                        <strong>Bussines Phone: </strong> {props.graphData.businessPhones[0]}
                    </p>
                    <p>
                        <strong>Preferred Language: </strong> {props.graphData.preferredLanguage}
                    </p>
                </div>
            </div>
        </div>
    );
};
//<ProfileData graphData={graphData} />