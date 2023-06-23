import React from "react";
//trying fluentUI
import { PopupModalExample } from './PopUpInfo.jsx';
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */
export const ProfileData = (props) => {
    return (
        <div id="profile-div">
            <p>
                <strong>First Name: </strong> {props.graphData.givenName}
            </p>
            <p>
                <strong>Last Name: </strong> {props.graphData.surname}
            </p>

            <PopupModalExample graphData={props.graphData} />
        </div>
    );
};
//<ProfileData graphData={graphData} />