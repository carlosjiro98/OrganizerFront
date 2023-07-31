import Dropdown from 'react-bootstrap/Dropdown';

function ContextualPlans({selectedGroupPlans, handleSelectPlan}) {
    
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic" style={{borderRadius:"5px", backgroundColor:"#1089b1", border:"none", width: "6rem"}}>
        Plans
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {selectedGroupPlans ? selectedGroupPlans.map(e =>(
            <Dropdown.Item onClick={() =>handleSelectPlan(e)} key={e.id}>{e.title}</Dropdown.Item>
        )) : <Dropdown.Item onClick={() => alert("Please select a group")} key={555}>Please select a group</Dropdown.Item> }
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ContextualPlans;