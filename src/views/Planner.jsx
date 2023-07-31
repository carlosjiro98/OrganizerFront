import '../css/App.css'
import React, { useEffect, useState } from 'react';
import { getWorkGroups, getPlansFromGroup, getBucketsFromPlan, getTasksFromPlan } from '../helpers/plannerApi';
import useGraphToken from '../helpers/hooks/useGraphtoken';
import ContextualMenu from '../components/Planner_components/ContextualMenu';
import PlannerDisplay from '../components/Planner_components/PlannerDisplay';
import ContextualPlans from '../components/Planner_components/ContextualPlans';
import { EntitlementPolicyIcon } from '@fluentui/react-icons-mdl2';

export default function Planner() {
    const {requestAccesToken} = useGraphToken();
    const [groups, setGroups] = useState(null);
    const [selectedGroupPlans, setSelectedGroupPlans] = useState(null); 
    const [selectedPlanBuckets, setSelectedPlanBuckets] = useState(null);
    const [selectedPlanTasks, setSelectedPlanTasks] = useState(null);
    const [infoG, setInfoG] = useState(null);
    const [infoP, setInfoP] = useState(null);

    useEffect(()=>{

        async function getGroups() {
            try {
    
                const tokenx = await requestAccesToken();
                const data = await getWorkGroups(tokenx);
                setGroups(data.value);
                
    
            } catch (error) {
                console.error(error);
            }
        }
        getGroups();
        // eslint-disable-next-line
    },[])

    //function passed to ContextualMenu to select the group and fetch the plans associated with the group
    async function handleSelectGroup (group) {
        setSelectedPlanBuckets(null);
        const tokenx = await requestAccesToken();
        let plans = await getPlansFromGroup(tokenx, group.id);
        setInfoG(group);
        //console.log(group);
        setSelectedGroupPlans(plans.value);
    }
    //function passed to ContextualPlans to select the Plan and fetch the buckets associated with that plan
    async function handleSelectPlan (plan) {
        const tokenx = await requestAccesToken();
        const buckets = await getBucketsFromPlan(tokenx, plan.id);
        const planTasks =await getTasksFromPlan(tokenx, plan.id);
        //console.log(planTasks.value);
        setInfoP(plan);
        setSelectedPlanBuckets(buckets.value);
        setSelectedPlanTasks(planTasks.value);
    }
    
    async function refreshPlanTasks (planId) {
        const token = await requestAccesToken();
        const planTasks = await getTasksFromPlan(token, planId);
        setSelectedPlanTasks(planTasks.value);
    }

    async function refreshPlanBuckets () {
        const token = await requestAccesToken();
        const planBuckets = await getBucketsFromPlan(token, infoP.id);
        setSelectedPlanBuckets(planBuckets.value);
    }

    return (
        <div>
            <center className="fixed_main_container">
                <div className='planner_header'>

                    <div className="groups_btn">
                        <ContextualMenu handleSelectGroup={handleSelectGroup} groups={groups} />
                        <ContextualPlans selectedGroupPlans={selectedGroupPlans} handleSelectPlan={handleSelectPlan} />
                    </div>
                    <div className="planner_title">
                        <h2>Planner</h2>
                    </div>
                    <div className="planner_info">
                        <h6>Group:  {infoG && infoG.displayName }</h6>
                        <h6>Visibility:  {infoG && infoG.visibility }</h6>
                    </div>
                    
                </div>
                <div>
                    {selectedGroupPlans 
                    ? 
                        <PlannerDisplay infoP={infoP} 
                                        handleSelectPlan={handleSelectPlan} 
                                        selectedPlanBuckets={selectedPlanBuckets} 
                                        selectedGroupPlans={selectedGroupPlans}
                                        selectedPlanTasks={selectedPlanTasks}
                                        refreshPlanTasks={refreshPlanTasks}
                                        refreshPlanBuckets={refreshPlanBuckets}
                        /> 
                    : 
                    <GroupDisplay groups={groups} handleSelectGroup={handleSelectGroup}/> }
                </div>
            </center>
        </div>
    )
}
//Show list of groups
function GroupDisplay ({groups, handleSelectGroup}) {
    return(
        <div className="plansDisplay_container">
            {groups ? groups.map(e =>(
                <div className="plansDisplay_card"  onClick={()=>handleSelectGroup(e)} key={e.id}>
                    <div className='planIcon'>
                        <EntitlementPolicyIcon style={{ height: "3rem", color: "#073a4b" }} />  
                    </div>
                    <div className='planInfo'>
                        <h5>{e.displayName}</h5>
                        <p style={{fontSize:"0.8rem", margin:"0"}}>ID:  {e.id}</p>
                    </div>
                </div>
            )) : <h1>Cargando ...</h1>}
        </div>
    )
}