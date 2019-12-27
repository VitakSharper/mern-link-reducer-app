import React, {useContext, useState} from "react";
import {useHistory} from 'react-router-dom';
import {Menu, Container, Icon} from 'semantic-ui-react'
import {AuthContext} from "../context/AuthContext";

const menuBar = {
    background: 'linear-gradient(#009eda, #007cbe,#9575CD 100%)',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid #29B6F6'
};


const NavBar = () => {
    const [activeItem, setActiveItem] = useState('');
    const history = useHistory();
    const auth = useContext(AuthContext);

    const handleLinks = (e, params) => {
        setActiveItem(params.name);
        history.push('/links');
    };

    const handleCreate = (e, params) => {
        setActiveItem(params.name);
        history.push('/create')
    };

    const handleSignout = (e) => {
        auth.signout();
        history.push('/auth');
    };

    return (
        <Menu fixed={"top"} borderless style={menuBar}>
            <Container text>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo"/>
                </Menu.Item>
                <Menu.Item header>
                    Link Reducer
                </Menu.Item>

                <Menu.Item
                    name='signout'
                    active={activeItem === 'signout'}
                    onClick={handleSignout}
                >Sign Out</Menu.Item>

                <Menu.Item
                    name='links'
                    active={activeItem === 'links'}
                    onClick={(e, params) => handleLinks(e, params)}
                >Links</Menu.Item>

                <Menu.Item
                    name='create'
                    active={activeItem === 'create'}
                    onClick={(e, params) => handleCreate(e, params)}
                >
                    <Icon name={'add'}/>
                    New Link
                </Menu.Item>
            </Container>
        </Menu>
    )
};

export default NavBar;
