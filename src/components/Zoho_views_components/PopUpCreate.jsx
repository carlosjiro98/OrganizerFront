import * as React from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { AddIcon } from '@fluentui/react-icons-mdl2';
import { zohoPostContacts } from '../../helpers/zohoApi';

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
        maxWidth: '40rem',
        maxHeight: '85vh',
        padding: '2rem 4rem 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    inputContainer: {
        maxHeight: '60vh',
        overflow: 'auto',
        width: '35rem',
    },
    btns: {
        marginTop: '2rem'
    }
});

export const PopUpCreate = ({updateState, viewFrom}) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);

    function setView () {
        if(viewFrom === "clients") {
            return <CrearClient updateState={updateState} hidePopup={hidePopup} />
        } else if (viewFrom === "accounts") {
            return <CrearAccount updateState={updateState} hidePopup={hidePopup} />
        }else {
            hidePopup();
        };
    }

    return (
        <>

            <PrimaryButton style={{ border: "none", marginRight: "1rem" }} onClick={showPopup}>
                <AddIcon />
            </PrimaryButton>
                  
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
                            </div>
                        </FocusTrapZone>
                    </Popup>
                </Layer>
            )}
        </>
    );
};

function CrearAccount ({hidePopup, updateState}) {
    const [body, setBody] = React.useState({
        data: [
          {
            Account_Name: "",
            Website: "",
            Phone: "",
            Industry: "",
            Employees: 0,
            Annual_Revenue: 0,
            Billing_City: "",
            Billing_Country: "",
            Description: ""
          }
        ]
      }
      );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBody(prevState => ({
          ...prevState,
          data: [
            {
              ...prevState.data[0],
              [name]: value
            }
          ]
        }));
      };
    const handleOnSubmit = async () => {
        if (body.data[0].Phone === "" || body.data[0].Industry === "" || body.data[0].Account_Name === "" ) {
            alert("The fields: Phone, Industry and Account_Name are required")
            return
        }
        console.log(body);
        await zohoPostContacts(body,'new-account');
        updateState();
        hidePopup();
    }

    return (
        <div >
            <center>
                <h3>Create new account</h3>
            </center>
            <br />
            <div className={popupStyles.inputContainer}>
                <p><strong>Account_Name:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Account_Name} name='Account_Name' />
                <p><strong>Website:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Website} name='Website' />
                <p><strong>Phone:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Phone} name='Phone' />
                <p><strong>Industry:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Industry} name='Industry' />
                <p><strong>Employees:</strong></p>
                <input type="number" onChange={handleInputChange} className="todo_input" value={body.data[0].Employees} name='Employees' />
                <p><strong>Annual_Revenue:</strong></p>
                <input type="number" onChange={handleInputChange} className="todo_input" value={body.data[0].Annual_Revenue} name='Annual_Revenue' />
                <p><strong>Billing_City:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Billing_City} name='Billing_City' />
                <p><strong>Billing_Country:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Billing_Country} name='Billing_Country' />
                <p><strong>Description:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Description} name='Description' />
            </div>
            <center className={popupStyles.btns}>
                <DefaultButton onClick={handleOnSubmit} style={{ marginRight: "1rem", backgroundColor:'#1089b1', color:'white' }}>Save</DefaultButton>
                <DefaultButton onClick={hidePopup} style={{ marginLeft: "1rem" }}>Close Popup</DefaultButton>
            </center>
        </div>
    )
}

function CrearClient ({hidePopup, updateState}) {
    const [body, setBody] = React.useState({
        data: [
          {
            Last_Name: "",
            First_Name: "",
            Email: "",
            Phone: "",
            Mobile: "",
            Title: "",
            Department: "",
            Mailing_Country: "",
            Description: ""
          }
        ]
      }
      );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBody(prevState => ({
          ...prevState,
          data: [
            {
              ...prevState.data[0],
              [name]: value
            }
          ]
        }));
      };
    const handleOnSubmit = async () => {
        if (body.data[0].First_Name === "" || body.data[0].Last_Name === "" || body.data[0].Email === "" || body.data[0].Phone === "") {
            alert("The fields: first name, last name, email and phone are required")
            return
        }
        console.log(body);
        await zohoPostContacts(body,'new-client');
        updateState();
        hidePopup();
    }

    return (
        <div >
            <center>
                <h3>Create new client</h3>
            </center>
            <br />
            <div className={popupStyles.inputContainer}>
                <p><strong>First_Name:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].First_Name} name='First_Name' />
                <p><strong>Last_Name:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Last_Name} name='Last_Name' />
                <p><strong>Email:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Email} name='Email' />
                <p><strong>Phone:</strong></p>
                <input type="text" required onChange={handleInputChange} className="todo_input" value={body.data[0].Phone} name='Phone' />
                <p><strong>Title:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Title} name='Title' />
                <p><strong>Department:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Department} name='Department' />
                <p><strong>Mailing_Country:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Mailing_Country} name='Mailing_Country' />
                <p><strong>Description:</strong></p>
                <input type="text" onChange={handleInputChange} className="todo_input" value={body.data[0].Description} name='Description' />
            </div>
            <center className={popupStyles.btns}>
                <DefaultButton onClick={handleOnSubmit} style={{ marginRight: "1rem", backgroundColor:'#1089b1', color:'white' }}>Save</DefaultButton>
                <DefaultButton onClick={hidePopup} style={{ marginLeft: "1rem" }}>Close Popup</DefaultButton>
            </center>
        </div>
    )
}