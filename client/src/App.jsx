import React from 'react';
import {Container} from "semantic-ui-react";
import useRoutes from "./routes";


function App() {
    const routes = useRoutes(false);
    return (
        <Container textAlign='justified'>
            {routes}
        </Container>
    );
}

export default App;
