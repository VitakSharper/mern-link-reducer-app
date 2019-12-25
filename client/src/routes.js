import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";

import AuthPage from "./pages/AuthPage";
import RegPage from "./pages/RegPage";

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path={'/links'} exact component={LinksPage}/>
                <Route path={'/create'} exact component={CreatePage}/>
                <Route path={'/detail/:id'} exact component={DetailPage}/>
                <Redirect to={'/create'}/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path={'/'} exact/>
            <Route path={'/auth'} component={AuthPage} exact/>
            <Route path={'/reg'} component={RegPage} exact/>
            <Redirect to={'/auth'}/>
        </Switch>
    )
};

export default useRoutes;
