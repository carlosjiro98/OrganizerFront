import * as React from 'react';
import {useState} from 'react'
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import '../../css/App.css';
import { AddIcon } from '@fluentui/react-icons-mdl2';
import {createBucket} from '../../helpers/plannerApi';
import useGraphToken from '../../helpers/hooks/useGraphtoken';

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
        minWidth: '450px',
        padding: '1rem 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
});

export const NewBucketPopUp = ({infoPlan, refreshPlanBuckets}) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
    const {requestAccesToken} = useGraphToken();
    const [newBucket, setNewBucket] = useState({
        name: "",
        planId: ""
    });
    React.useEffect (() => {
        setNewBucket((prev) => ({
            ...prev,
            planId: infoPlan.id
        }))

    }, [infoPlan])

    //Task info ------------------------------------------
    function handleTaskInfo (e) {
        setNewBucket((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    //Create btn ------------------------------------------
    async function handleOnCreate (e) {
        e.preventDefault();
        console.log(infoPlan);
        const token = await requestAccesToken();
        await createBucket(token, newBucket);
        await refreshPlanBuckets();
        hidePopup();
    }

    return (
        <>
            <div className='bucket_card' onClick={showPopup} >
                <div className='addBucketCard'>
                    <AddIcon style={{height:"3rem", paddingRight:"3rem"}} />
                    <h6>Add new bucket</h6>
                </div>
            </div>
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
                                    <h3>Create Bucket</h3>
                                </center>
                                <br/>
                                <form className='createTaskForm'>

                                    <div className='createTask_Title'>
                                        <span>Title:</span><br/>
                                        <input type="text" 
                                               name="name" 
                                               placeholder='task title' 
                                               onChange={handleTaskInfo} 
                                               value={newBucket.name}
                                        />
                                    </div>

                                    <button className='createTask_btn' onClick={handleOnCreate}>Create Task</button>
                                </form>
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
