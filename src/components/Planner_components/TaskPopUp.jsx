import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { getTaskDetail, patchTaskDetail, patchTask } from '../../helpers/plannerApi';
import { useBoolean } from '@fluentui/react-hooks';
import ContextualBucket from './ContextualBucket';
import '../../css/App.css';
import useGraphToken from '../../helpers/hooks/useGraphtoken';
import CheckItemsDisplay from './CheckItemsDisplay';
import CheckTaskLogicCard from './CheckTaskLogicCard';


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

export const TaskPopUp = ({task, refreshPlanTasks, selectedPlanBuckets}) => {
    const {requestAccesToken} = useGraphToken();
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
    const [taskDetails, setTaskDetails] = useState(null);
    const [taskChanges, setTaskChanges] = useState(task.title);
    const [showIT, setShowIT] = useState(false);

    // modify chacklist and add new checklistitems
    function getActualCheckList (checklistx) {
         setTaskDetails((prev) => ({
            ...prev,
             checklist: checklistx
         }));
        //console.log(taskDetails);
    }

    function handleOnChange (e) {
        if (e.target.name === 'title') {
            setTaskChanges(e.target.value);
        } else if (e.target.name === 'description') {
            setTaskDetails((prev) => ({
                ...prev,
                description: e.target.value
            }))
        }
        
    }

    async function setCheckTaskStatus (percent) {
        const etag = task['@odata.etag']
        //console.log(etag)
        //console.log(percent);
        let completeStatus = {
            percentComplete: percent
        }
        const token = await requestAccesToken();
        await patchTask(token, completeStatus, etag, task.id);
        refreshPlanTasks(task.planId);
        //console.log(taskUpdated);

    }

    function handleOnClickTitle (e) {
        setShowIT(true);
    }
// Open PopUp Detail & get task Detail
    async function handleOnOpen (id) {
        showPopup();
        const token = await requestAccesToken();
        const details = await getTaskDetail(token, id);
        setTaskDetails(details);
        //console.log(task);
        
    }

// Close PopUp Detail & get task Detail
    async function handleOnClose () {
        hidePopup();
        setShowIT(false);//title mod
        //console.log('---------------------------------------------------------')
        //console.log(taskDetails);
        const token = await requestAccesToken();
        await patchTaskDetail(token, taskDetails);
        setTaskDetails(null);
        refreshPlanTasks(task.planId);
    }


    return (
        <>
            <div className='taskCard'>
                <div className='taskCard_header'  >
                    <CheckTaskLogicCard setCheckTaskStatus={setCheckTaskStatus} initial={task.percentComplete} />
                    <p onClick={() => handleOnOpen(task.id)}><b>{task.title}</b></p>
                </div>
                <div className='checklist_preview' onClick={() => handleOnOpen(task.id)}>
                    {task.checklistItemCount !== 0 ? <span>Checklist done: <strong>{task.checklistItemCount - task.activeChecklistItemCount}/{task.checklistItemCount}</strong></span> : '' }
                </div>
                <div className='TaskCard_btn_container'>
                    <PrimaryButton text='Detail' onClick={() => handleOnOpen(task.id)} style={{borderRadius:"5px", backgroundColor:"#1a936f", border:"none", width: "6rem", height:"1.8rem"}} />
                    <ContextualBucket selectedPlanBuckets={selectedPlanBuckets} refreshPlanTasks={refreshPlanTasks} task={task} />
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
                                {/* -----------------------------Title-------------------------------------- */}
                                <div className='taskDetail_title_container'>
                                    {showIT 
                                    ?
                                    <div className='createTask_Title'>
                                        <span>Title:</span><br/>
                                        <input className='titleInput_Detail' 
                                               type='text' 
                                               name='title' 
                                               value={taskChanges} 
                                               onChange={handleOnChange}  />
                                    </div>
                                    :
                                    <div onClick={handleOnClickTitle} className='titleNoMod'>
                                        <h3>{task.title}</h3>
                                    </div>
                                    }
                                    
                                    
                                </div>
                                {/* -----------------------------Description-------------------------------------- */}
                                {taskDetails 
                                ? 
                                <div>
                                    <div className='createTask_Description' style={{marginBottom:'1rem'}} >
                                        <span>Description:</span><br/>
                                        <textarea onChange={handleOnChange} 
                                                  className='testArea_check' 
                                                  value={taskDetails.description ? taskDetails.description : ""} 
                                                  name="description" 
                                                  cols="50" 
                                                  rows="5" />
                                    </div>
                                    {/* -----------------------------CheckList-------------------------------------- */}
                                    <div className='createTask_Checklist'>
                                        <span>Check list:</span><br/>
                                        
                                        <CheckItemsDisplay initialItems={taskDetails.checklist ? taskDetails.checklist : null}
                                                        getActualCheckList={getActualCheckList}   />
                                    </div>

                                </div> 
                                : 
                                <h6>Cargando ...</h6>}
                                <br/>
                
                                <center>
                                    <DefaultButton onClick={handleOnClose}>Close Popup</DefaultButton>
                                </center>
                            </div>
                        </FocusTrapZone>
                    </Popup>
                </Layer>
            )}
        </>
    );
};
// getActualCheckList={getActualCheckList}