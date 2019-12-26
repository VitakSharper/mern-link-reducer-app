import React from 'react';
import {Container} from "semantic-ui-react";

import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";

import {AuthContext} from "./context/AuthContext";


function App() {
    const {token, userId, signout, signin} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{token, signin, signout, userId, isAuthenticated}}>
            <Container textAlign='justified'>
                {routes}
            </Container>
        </AuthContext.Provider>
    );
}

export default App;
