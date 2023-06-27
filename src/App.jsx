// eslint-disable-next-line
import React from 'react';
import './css/App.css';
import { Routes, Route } from 'react-router-dom';
//Azure
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
//Views annd components
import Home from './views/Home';
import ToDo from './views/ToDo';
import NoLogged from './views/NoLogged';
import Contacts from './views/Contacts';
import SideNavar from './components/SideNavBar';
import { PageLayout } from './components/PageLayout';
//provider
import { GlobalProvider } from './Provider/GlobalProvider'




/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate >
                <GlobalProvider>
                    <SideNavar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/todo" element={<ToDo />} />
                     </Routes>
                </GlobalProvider>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <NoLogged />
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <div className="app_main_container">
                <MainContent />
            </div>
        </PageLayout>
    );
}
