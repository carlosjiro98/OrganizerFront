import * as React from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { AddIcon, EditSolid12Icon } from '@fluentui/react-icons-mdl2';

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
        padding: '1rem 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
});

export const PopUpEditList: React.FunctionComponent = (props) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
    const [actualName, setActualName] = React.useState("");

    React.useEffect(() => {
        props.typeIndicator ? setActualName("") : setActualName(props.actualTodo.name);
    }, [])
   
    function methodAsign() {
        props.typeIndicator ? props.addFunction(actualName) : props.updateFunction(actualName, props.actualTodo.id, props.actualTodo.isComplete);
        setActualName("");
        hidePopup();
    }

    function handleOnChange(e) {
        setActualName(prev => e.target.value);
    }

    return (
        <>
            {props.typeIndicator
                ? 
                <PrimaryButton style={{ border: "none", marginRight: "1rem" }} onClick={showPopup}>
                    <AddIcon />
                </PrimaryButton>
                :
                <PrimaryButton style={{ backgroundColor: "#e7a34b", border: "none", }} onClick={showPopup}>
                    <EditSolid12Icon />
                </PrimaryButton>
        }
            
            
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
                                    {props.typeIndicator ? <h3>Create</h3> : <h3>Edit</h3>}
                                </center>
                                <br />
                                <p>
                                    <strong>Enter the ToDo:</strong>
                                </p>

                                <input type="text" onChange={handleOnChange} className="todo_input" value={actualName} />

                                <br />
                                <br />
                                <br />

                                <center>
                                    <DefaultButton onClick={methodAsign} style={{ marginRight: "1rem" }}>Save</DefaultButton>
                                    <DefaultButton onClick={hidePopup} style={{ marginLeft: "1rem" }}>Close Popup</DefaultButton>
                                </center>
                            </div>
                        </FocusTrapZone>
                    </Popup>
                </Layer>
            )}
        </>
    );
};