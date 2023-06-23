import '../css/App.css'
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CheckLogic from '../components/CheckLogic';
import Container from 'react-bootstrap/Container';
import {  PrimaryButton } from '@fluentui/react/lib/Button';
import { useAllToDosContext, useGetAllToDosContext } from '../Provider/GlobalProvider'
import { EditSolid12Icon, DeleteIcon, RefreshIcon, AddIcon } from '@fluentui/react-icons-mdl2';
import { deleteToDo } from '../helpers/organizerApi';

function ContactCard({ toDoData, deleteFuntion }) {
    
    return (
        <Row className="todo_list_item">

            <Col xs={9} className="todo_col">

                <Row className="todo_inner_row">
                    <Col xs={1} className="todo_inner_col">
                        <CheckLogic data={toDoData} />
                    </Col>
                    <Col className="todo_inner_col">
                        <p>{toDoData.name}</p>
                    </Col>
                </Row>

            </Col>
            <Col xs={3} className="todo_col">

                <Row className="todo_inner_row">
                    <Col className="todo_col">
                        <PrimaryButton style={{ backgroundColor: "#e7a34b", border: "none", }}>
                            <EditSolid12Icon />
                        </PrimaryButton>
                    </Col>
                    <Col className="todo_col">
                        <PrimaryButton onClick={() => deleteFuntion(toDoData.id)} style={{ backgroundColor: "	#DC3545", border: "none", }}>
                            <DeleteIcon />
                        </PrimaryButton>
                    </Col>
                </Row>

            </Col>


        </Row>
    );
}
function ContainerExample() {
    const allToDos = useAllToDosContext();
    const [displayTodos, setDisplayTodos] = useState(allToDos)
    useEffect(() => { setDisplayTodos(allToDos) }, [allToDos])
    async function delteTodoById(id) {
        console.log("inicie id:" + id);
        let alltodosX = displayTodos.filter(todo => todo.id !== id)
        setDisplayTodos(alltodosX)
        console.log(alltodosX);
        await deleteToDo(id);
    }

    return (
        <Container className="contact_list_container">
            {displayTodos ? displayTodos.map(item => <ContactCard key={item.id} toDoData={item} deleteFuntion={delteTodoById} />) : <h1>Hola</h1>}
        </Container>
    );
}

export default function Contacts() {
    /*const contacts = useContactsContext();*/
    const requestAllToDosData = useGetAllToDosContext();

    return (
        <div>
            <center className="fixed_main_container">
                <h2>ToDo List</h2>
                
                <ContainerExample />
                <br />
                <PrimaryButton style={{ border: "none", marginRight: "1rem" }}>
                    <AddIcon />
                </PrimaryButton>
                <PrimaryButton style={{ border: "none", marginLeft: "1rem" }} onClick={requestAllToDosData}>
                    <RefreshIcon />
                </PrimaryButton>
            </center>
        </div>
    )
}