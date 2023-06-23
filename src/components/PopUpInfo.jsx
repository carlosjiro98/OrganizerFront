import * as React from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

const popupStyles = mergeStyleSets({
    root: {
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: '0',
        left: '0',
        position: 'fixed',
        right: '0',
        top: '0',
    },
    content: {
        background: 'white',
        borderRadius: '10px',
        left: '50%',
        maxWidth: '400px',
        padding: '1rem 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
});

export const PopupModalExample: React.FunctionComponent = (props) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
    return (
        <>
            <DefaultButton className="detail_pop_btn" onClick={showPopup} text="Detail" />
            {isPopupVisible && (
                <Layer>
                    <Popup
                        className={popupStyles.root}
                        role="dialog"
                        aria-modal="true"
                        onDismiss={hidePopup}
                        enableAriaHiddenSiblings={true}
                    >
                        <Overlay onClick={hidePopup} />
                        <FocusTrapZone>
                            <div role="document" className={popupStyles.content}>
                                <center>
                                    <h3>User Detail</h3>
                                </center>
                                <br/>
                                <p>
                                    <strong>Full Name: </strong> {props.graphData.displayName}
                                </p>
                                <p>
                                    <strong>JobTitle: </strong> {props.graphData.jobTitle}
                                </p>
                                <p>
                                    <strong>Email: </strong> {props.graphData.userPrincipalName}
                                </p>
                                <p>
                                    <strong>Id: </strong> {props.graphData.id} 
                                </p>
                                <p>
                                    <strong>Bussines Phone: </strong> {props.graphData.businessPhones[0]}
                                </p>
                                <p>
                                    <strong>Preferred Language: </strong> {props.graphData.preferredLanguage}
                                </p>
                                <br/>
                                <center>
                                    <DefaultButton onClick={hidePopup}>Close Popup</DefaultButton>
                                </center>
                            </div>
                        </FocusTrapZone>
                    </Popup>
                </Layer>
            )}
        </>
    );
};
//businessPhones