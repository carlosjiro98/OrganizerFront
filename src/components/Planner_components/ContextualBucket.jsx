import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {patchTask} from '../../helpers/plannerApi';
import useGraphToken from '../../helpers/hooks/useGraphtoken';

function ContextualBucket({selectedPlanBuckets, task, refreshPlanTasks}) {

  const {requestAccesToken} = useGraphToken();
  
  // useEffect(()=>{
  //   console.log(buckets)
  // },[])

  async function handleOnSelect (e) {
    const etag = task['@odata.etag'];
    //console.log(etag)
    const body = {
      bucketId: e.id
    } 
    //console.log(e.id);
    const token = await requestAccesToken();
    await patchTask(token, body, etag, task.id);
    refreshPlanTasks(task.planId);
    
  }
    
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic" style={{borderRadius:"5px", backgroundColor:"#e7a34b", border:"none", width: "6rem"}}>
        Bucket
      </Dropdown.Toggle>

      <Dropdown.Menu>

        {selectedPlanBuckets 
                  ? 
                  selectedPlanBuckets.map(e =>(
                      <Dropdown.Item onClick={() =>handleOnSelect(e)} key={e.id}>{e.name}</Dropdown.Item>)) 
                  : 
                    <Dropdown.Item onClick={() => alert("Please select a group")} key={555}>Loading ...</Dropdown.Item> 
        }

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ContextualBucket;