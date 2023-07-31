import * as React from 'react';
import {useState} from 'react'
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import '../../css/App.css';
import { AddIcon } from '@fluentui/react-icons-mdl2';
import CheckItemsDisplay from './CheckItemsDisplay';
import {createTask, patchNewTaskDetail, getTaskDetail} from '../../helpers/plannerApi';
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

export const CreateTaskPopUp = ({bucketInfo, refreshPlanTasks}) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
    const {requestAccesToken} = useGraphToken();

    const [newTask, setNewTask]  = useState({
        planId: bucketInfo.planId,
        title: "",
        bucketId: bucketInfo.id
    });
    const [newTaskDetail, setNewTaskDetail] = useState({
        description: "",
        checklist: {},
    });
    //Checklist info ------------------------------------
    function getActualCheckList (items) {
        setNewTaskDetail((prev) => ({
            ...prev,
            checklist: items
        }))
    }
    //Task info ------------------------------------------
    function handleTaskInfo (e) {
        setNewTask((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    //Task Detail info -----------------------------------
    function handleTaskDetailInfo (e) {
        setNewTaskDetail((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

    }
    //Create btn ------------------------------------------
    async function handleOnCreate (e) {
        e.preventDefault();
        const token = await requestAccesToken();
        const createdTask = await createTask(token, newTask); //crea la task

        const taskDetail = await getTaskDetail(token, createdTask.id); // pideel detalle de la task
        const etag = taskDetail['@odata.etag']

        await patchNewTaskDetail(token, newTaskDetail, etag, taskDetail.id);

        refreshPlanTasks(bucketInfo.planId);
        setNewTask({
            planId: bucketInfo.planId,
            title: "",
            bucketId: bucketInfo.id
        })
        hidePopup();
    }

    return (
        <>
            <AddIcon className='addIcon' onClick={showPopup} />
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
                                    <h3>Create new task</h3>
                                </center>
                                <br/>
                                <form className='createTaskForm'>

                                    <div className='createTask_Title'>
                                        <span>Title:</span><br/>
                                        <input type="text" 
                                               name="title" 
                                               placeholder='task title' 
                                               onChange={handleTaskInfo} 
                                               value={newTask.title}
                                        />
                                    </div>

                                    <div className='createTask_Description' >
                                        <span>Description:</span><br/>
                                        <textarea className='testArea_check' 
                                                  name="description"
                                                  value={newTaskDetail.description}
                                                  onChange={handleTaskDetailInfo}
                                                  placeholder='Task description...' 
                                                  cols="50" 
                                                  rows="5" 
                                        />
                                    </div>
                                    
                                    <div className='createTask_Checklist'>
                                        <span>Check list:</span><br/>
                                        
                                        <CheckItemsDisplay getActualCheckList={getActualCheckList} />
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
