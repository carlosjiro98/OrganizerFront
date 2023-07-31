import { EntitlementPolicyIcon } from '@fluentui/react-icons-mdl2';
import {TaskPopUp} from './TaskPopUp';
import {CreateTaskPopUp} from './CreateTaskPopUp';
import { NewBucketPopUp } from './NewBucketPopUp';

export default function PlannerDisplay ({ selectedPlanBuckets ,selectedGroupPlans, handleSelectPlan, infoP, selectedPlanTasks, refreshPlanTasks, refreshPlanBuckets })  {
    
    return (
        <div>

            {
            selectedPlanBuckets 
            ? 
            <BucketsDisplay infoP={infoP} 
                            refreshPlanTasks={refreshPlanTasks}  
                            selectedPlanBuckets={selectedPlanBuckets} 
                            selectedPlanTasks={selectedPlanTasks} 
                            refreshPlanBuckets={refreshPlanBuckets}
            /> 
            :
            <PlanDisplay handleSelectPlan={handleSelectPlan} selectedGroupPlans={selectedGroupPlans} />
            }

        </div>
    )
}

function PlanDisplay ({selectedGroupPlans, handleSelectPlan}) {
    return(
        <div className="plansDisplay_container">
            {selectedGroupPlans ? selectedGroupPlans.map(e =>(
                <div className="plansDisplay_card"  onClick={()=>handleSelectPlan(e)} key={e.id}>
                    <div className='planIcon'>
                        <EntitlementPolicyIcon style={{ height: "3rem", color: "#073a4b" }} />  
                    </div>
                    <div className='planInfo'>
                        <h5>{e.title}</h5>
                        <p style={{fontSize:"0.8rem", margin:"0"}}>ID:  {e.id}</p>
                    </div>
                </div>
            )) : <h1>Cargando ...</h1>}
        </div>
    )
}

function BucketsDisplay ({selectedPlanBuckets, infoP, selectedPlanTasks, refreshPlanTasks, refreshPlanBuckets}) {
    //infoP = infoPlan
    const reversedBuckets = selectedPlanBuckets.slice().reverse();
    return (
        <div className='bucketsDisplay_container'>
            <div className='bucketsDisplay_info'>
                <p style={{margin:"0 0 0 1rem"}}>Plan:</p>
                <h5 style={{margin:"0 0 0 0.5rem"}}>{ infoP&& infoP.title }</h5>
            </div>

            <div className='bucket_card_container'>
                {reversedBuckets.length > 0 ? (
                    reversedBuckets.map((e) => (
                        <div key={e.id} className='bucket_card'>
                            <div className='bucket_title'>
                                <h6 style={{margin:"0"}}>
                                    {e.name}
                                </h6>
                                <CreateTaskPopUp bucketInfo={e} 
                                                 refreshPlanTasks={refreshPlanTasks}
                                />
                            </div>
                            <TasksCardDisplay refreshPlanTasks={refreshPlanTasks} 
                                              selectedPlanTasks={selectedPlanTasks} 
                                              bucketId={e.id}
                                              selectedPlanBuckets={selectedPlanBuckets}  
                            />
                        </div>
                    ))
                    ) : (
                        <h1>Cargando...</h1>
                    )}
                {/* --------------------- New Bucket------------------------ */}
                <NewBucketPopUp infoPlan={infoP} refreshPlanBuckets={refreshPlanBuckets}/>
                {/* <div className='bucket_card'>
                    <div className='addBucketCard'>
                        <AddIcon style={{height:"3rem", paddingRight:"3rem"}} />
                        <h6>Add new bucket</h6>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

function TasksCardDisplay ({selectedPlanTasks, bucketId, refreshPlanTasks, selectedPlanBuckets}) {
    const tasksByBucket = selectedPlanTasks.filter(e => e.bucketId === bucketId);
    return (
        <div className='cardsInner_container'>
            {tasksByBucket ? tasksByBucket.map(e => (
                <TaskPopUp refreshPlanTasks={refreshPlanTasks} key={e.id} task={e} selectedPlanBuckets={selectedPlanBuckets} />
                // <div key={e.id}>
                //     {e.title}
                // </div>
            )) : <h1>Assign a tasks ...</h1>}
        </div>
    )
}