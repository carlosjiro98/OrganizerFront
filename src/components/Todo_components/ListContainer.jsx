import '../../css/App.css'
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CheckLogic from '../Todo_components/CheckLogic';
import Container from 'react-bootstrap/Container';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { useAllToDosContext } from '../../Provider/GlobalProvider'
import { DeleteIcon, RefreshIcon } from '@fluentui/react-icons-mdl2';
import { deleteToDo, postToDo, updateToDo } from '../../helpers/organizerApi';
import { PopUpEditList } from '../Todo_components/PopUpEditList';
import { useGetAllToDosContext } from '../../Provider/GlobalProvider'
function ListCard({ toDoData, deleteFuntion, updateFunction }) {

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
                        <PopUpEditList typeIndicator={false} actualTodo={toDoData} updateFunction={updateFunction } />
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
export default function ListContainer() {
    const allToDos = useAllToDosContext();
    const [displayTodos, setDisplayTodos] = useState(allToDos);
    
    useEffect(() => { setDisplayTodos(allToDos) }, [allToDos]);

    //DELETE 
    async function delteTodoById(id) {
    
        let alltodosX = displayTodos.filter(todo => todo.id !== id)
        setDisplayTodos(alltodosX)
        await deleteToDo(id);
    }
    //ADD 
    async function addTodo(name) {
        let lastIndex = displayTodos.length - 1
        let lastId = displayTodos.length>0 ?  displayTodos[lastIndex].id : 1
        console.log(lastId)

        let todo = {
            "id": lastId + 1,
            "name": name,
            "isComplete": false
        }
        setDisplayTodos(prevState => [...prevState, todo]);
        await postToDo({
            "name": name,
            "isComplete": false,
            "secret": "from app"
        })
    }
    //UPDATE 
    async function updateTodo(name, id, isComplete) {
        let todoIndex = displayTodos.findIndex(obj => obj.id === id);

        console.log(todoIndex)
        setDisplayTodos(prevState => {
            let x = [...prevState]
            x[todoIndex].name = name
            return x
        });
        console.log(displayTodos);

        await updateToDo({
            "id": id,
            "name": name,
            "isComplete": isComplete
        })
    }

    const requestAllToDosData = useGetAllToDosContext();

    return (<>
        <Container className="todo_list_container">
            {displayTodos
                ?
                    displayTodos.map(item => <ListCard key={item.id} toDoData={item} deleteFuntion={delteTodoById} updateFunction={updateTodo} />)
                :
                    <div className="loader_con"><div class="loader"></div></div>
            }
        </Container>
        <br />

        <PopUpEditList typeIndicator={true} addFunction={addTodo} />
                
        <PrimaryButton style={{ border: "none", marginLeft: "1rem" }} onClick={requestAllToDosData}>
               <RefreshIcon />
        </PrimaryButton>
        </>
    );
}