import Dropdown from 'react-bootstrap/Dropdown';

function ContextualMenu({groups, handleSelectGroup}) {
    async function selectGroup (group) {
      handleSelectGroup(group);
    }
  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic" style={{borderRadius:"5px", backgroundColor:"#1089b1", border:"none", width: "6rem"}}>
        Groups
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {groups ? groups.map(group =>(
            <Dropdown.Item onClick={() => selectGroup(group)} key={group.id}>{group.displayName}</Dropdown.Item>
        )) : <p>cargando ...</p> }
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ContextualMenu;