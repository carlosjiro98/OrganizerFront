import '../css/App.css'
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CheckLogic from '../components/CheckLogic';
import Container from 'react-bootstrap/Container';
import {  PrimaryButton } from '@fluentui/react/lib/Button';
import { useAllToDosContext, useGetAllToDosContext } from '../Provider/GlobalProvider'
import { EditSolid12Icon, DeleteIcon, RefreshIcon, AddIcon } from '@fluentui/react-icons-mdl2';

function ContactCard({ toDoData }) {
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
                        <PrimaryButton style={{ backgroundColor: "	#DC3545", border: "none", }}>
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

    return (
        <Container className="contact_list_container">
            {allToDos ? allToDos.map(item => <ContactCard key={item.id} toDoData={item} />) : <h1>Hola</h1>}
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