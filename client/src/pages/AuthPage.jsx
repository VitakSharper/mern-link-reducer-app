import React, {useState, useEffect, useContext} from "react";
import {withRouter} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";


import {Grid, Segment, Form, Input, Button, Label, Message} from "semantic-ui-react";
import {useHttp} from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";

import MessageHook from "../hooks/Message";

const classes = {
    segment: {
        background: 'linear-gradient( #42A5F5,#E3F2FD)',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    }
};

const AuthPage = ({history}) => {
    const auth = useContext(AuthContext);
    const {loading, message, request, clearMessage} = useHttp();


    const [form, setForm] = useState({email: '', password: ''});

    useEffect(() => {
        clearMessage();
    }, [message, clearMessage]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const signinHandler = async () => {
        try {
            const data = await request('/api/auth/signin', 'POST', {...form});
            auth.signin(data.token);
        } catch (e) {

        }
    };

    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Segment style={classes.segment}>
                    <Label as='p' color='blue' ribbon={'right'}>
                        Sign In
                    </Label>
                    <Form onSubmit={signinHandler}>
                        <Form.Field
                            type={'email'}
                            control={Input}
                            name={'email'}
                            label='Email'
                            placeholder='joe@schmoe.com'
                            required
                            onChange={changeHandler}
                        />
                        <Form.Field
                            type={'password'}
                            name={'password'}
                            control={Input}
                            label='Password'
                            placeholder='password'
                            required
                            onChange={changeHandler}
                        />
                        <Button.Group>
                            <Form.Field
                                control={Button}
                                basic color='blue'
                                type={'submit'}
                                content={'Sign In'}/>
                            <Button.Or/>
                            <Form.Field
                                control={Button} type={'button'} content={'Sign Up'}
                                basic color='green'
                                onClick={() => history.push('/reg')}
                            />
                        </Button.Group>
                        {
                            message ? (<MessageHook message={message}/>) : ('')
                        }
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};
export default withRouter(AuthPage);
