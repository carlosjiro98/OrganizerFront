import * as React from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { PrimaryButton } from '@fluentui/react/lib/Button';

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
        padding: '1rem 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    showingData: {
        display: 'flex',
        gap: '5rem'
    }
});

export const PopUpZoho = ({data, viewFrom}) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);

    function setView () {
        if(viewFrom === "clients") {
            return <ClientsView data={data} />
        } else if (viewFrom === "accounts") {
            return <AccountsView data={data} />
        }else {
            hidePopup();
        };
    }

    return (
        <>
            <PrimaryButton className="detail_pop_btn hover_btn" onClick={showPopup} text="Detail" />
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
                                {setView()}
                                
                                <br/>
                                <center>
                                    <DefaultButton onClick={hidePopup}>Close</DefaultButton>
                                </center>
                            </div>
                        </FocusTrapZone>
                    </Popup>
                </Layer>
            )}
        </>
    );
};

/*
Last_Name: "",
            First_Name: "",
            Email: "",
            Phone: "",
            Mobile: "",
            Title: "",
            Department: "",
            Mailing_Country: "",
            Description: ""
*/

function ClientsView ({data}) {
    return (
        <div>
            <center>
                <h3>Client Detail</h3>
            </center>
            <br/>
            <div className={popupStyles.showingData}>
                <div>
                    <p>
                        <strong>First Name:<br/></strong> {data.First_Name ? data.First_Name : <span>Null</span>}
                    </p>                
                    <p>
                        <strong>Last Name:<br/></strong> {data.Last_Name? data.Last_Name : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Email:<br/></strong> {data.Email ? data.Email : <span>Null</span>} 
                    </p>
                    <p>
                        <strong>Phone:<br/></strong> {data.Phone ? data.Phone : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Title:<br/></strong> {data.Title ? data.Title : <span>Null</span>}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Department:<br/></strong> {data.Department ? data.Department : <span>Null</span>}
                    </p>
                                        
                    <p>
                        <strong>Mailing Country:<br/></strong> {data.Mailing_Country ? data.Mailing_Country : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Id:<br/></strong> {data.id ? data.id : <span>Null</span>} 
                    </p>
                    <p>
                        <strong>Description:<br/></strong> {data.Description ? data.Description : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Mascotas:<br/></strong> {data.mascotas ? data.Phone : <span>Null</span>}
                    </p>
                </div>
            </div>
        </div>
    )
}

/*
            Account_Name: "",
            Website: "",
            Phone: "",
            Industry: "",
            Employees: 0,
            Annual_Revenue: 0,
            Billing_City: "",
            Billing_Country: "",
            Description: ""
*/
function AccountsView ({data}) {
    return (
        <div>
            <center>
                <h3>Account Detail</h3>
            </center>
            <br/>
            <div className={popupStyles.showingData}>
                <div>
                    <p>
                        <strong>Account Name:<br/></strong> {data.Account_Name ? data.Account_Name : <span>Null</span>}
                    </p>
                                        
                    <p>
                        <strong>Website:<br/></strong> {data.Website ? data.Website : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Industry:<br/></strong> {data.Industry ? data.Industry : <span>Null</span>} 
                    </p>
                    <p>
                        <strong>Phone:<br/></strong> {data.Phone ? data.Phone : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Employees:<br/></strong> {data.Employees ? data.Employees : <span>Null</span>}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Annual Revenue:<br/></strong> {data.Annual_Revenue ? data.Annual_Revenue : <span>Null</span>}
                    </p>
                                        
                    <p>
                        <strong>Billing City:<br/></strong> {data.Billing_City ? data.Billing_City : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Billing Country:<br/></strong> {data.Billing_Country ? data.Billing_Country : <span>Null</span>} 
                    </p>
                    <p>
                        <strong>id:<br/></strong> {data.id ? data.id : <span>Null</span>}
                    </p>
                    <p>
                        <strong>Description:<br/></strong> {data.Description ? data.Description : <span>Null</span>}
                    </p>
                </div>
            </div>
        </div>
    )
}