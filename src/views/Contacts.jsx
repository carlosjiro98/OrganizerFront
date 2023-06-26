import { useContactsContext} from '../Provider/GlobalProvider'
import { PopupModalExample } from '../components/PopUpInfo';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ContactIcon } from '@fluentui/react-icons-mdl2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import '../css/App.css';

function ContactCard({ contactData }) {
    return (
        <Row className="contact_list_item">
            
            <Col xs={3} className="contact_col">

                <Row className="roro">
                    <Col xs={3} className="contact_col ">
                        <ContactIcon />
                    </Col>
                    <Col className="contact_col">
                        <p>{contactData.givenName} {contactData.surname}</p>
                    </Col>
                </Row>

            </Col>

            <Col xs={9} className="contact_col">

                <Row className="roro">
                    <Col className="contact_col">
                        <p>{contactData.userPrincipalName}</p>
                    </Col>
                    <Col className="contact_col">
                        <p>{contactData.id}</p>
                    </Col>
                    <Col xs={1} className="contact_col" ><PopupModalExample graphData={contactData} /></Col>
                </Row>

            </Col>
            
        </Row>
    );
}
function ContainerExample() {
    const contacts = useContactsContext();
    
    return (
        <Container className="contact_list_container">
            {contacts
                ?
                    contacts.map(item => <ContactCard key={item.givenName} contactData={item} />)
                :
                    <div className="loader_con"><div class="loader"></div></div>
            }
        </Container>
    );
}

export default function Contacts() {

    return (
        <div>
            <center className="fixed_main_container">
                <h2>CONTACTS</h2>

                <div className="flags_bar">
                    <div className="flag1"><p>User:</p></div>
                    <div className="flag2"><p>Email:</p></div>
                    <div className="flag3"><p>Id:</p></div>
                </div>

                <ContainerExample />
                <br/>
                <PrimaryButton text="Reload" style={{ border: "none", marginLeft: "1rem" }} />
            </center>
        </div>
    )
}