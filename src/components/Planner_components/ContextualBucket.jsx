import Dropdown from 'react-bootstrap/Dropdown';

function ContextualBucket() {
    
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic" style={{borderRadius:"5px", backgroundColor:"#e7a34b", border:"none", width: "6rem"}}>
        Bucket
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* {selectedGroupPlans ? selectedGroupPlans.map(e =>(
            <Dropdown.Item onClick={() =>handleSelectPlan(e)} key={e.id}>{e.title}</Dropdown.Item>
        )) : <Dropdown.Item onClick={() => alert("Please select a group")} key={555}>Please select a group</Dropdown.Item> } */}
        <Dropdown.Item onClick={() => alert("Please select a group")}>To Do</Dropdown.Item>
        <Dropdown.Item onClick={() => alert("Please select a group")}>Done</Dropdown.Item>
        <Dropdown.Item onClick={() => alert("Please select a group")}>In Progress</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ContextualBucket;