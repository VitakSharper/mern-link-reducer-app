import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';
import {Grid, Segment, Form, Input, Button, Label} from "semantic-ui-react";
import {useHttp} from "../hooks/http.hook";
import MessageHook from "../hooks/Message";

const classes = {
    segment: {
        background: 'linear-gradient(#81C784,#E8F5E9)',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
    }
};

const RegPage = ({history}) => {

    const {loading, message, request, clearMessage} = useHttp();
    const [form, setForm] = useState({email: '', password: '', passwordConfirm: ''});

    useEffect(() => {
        setTimeout(() => {
            clearMessage();
        }, 5000);
    }, [message, clearMessage]);


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const regHandler = async () => {
        try {
            const data = await request('/api/auth/signup', 'POST', {...form});
            console.log('resp Data: ', data);
        } catch (e) {

        }
    };

    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Segment style={classes.segment}>
                    <Label as='p' color='green' ribbon={'right'}>
                        Sign Up
                    </Label>
                    <Form onSubmit={regHandler}>
                        <Form.Field
                            type={'email'}
                            control={Input}
                            label='Email'
                            placeholder='joe@schmoe.com'
                            required
                            name={'email'}
                            onChange={changeHandler}
                        />
                        <Form.Field
                            type={'password'}
                            control={Input}
                            label='Password'
                            placeholder='password'
                            required
                            name={'password'}
                            onChange={changeHandler}
                        />
                        <Form.Field
                            type={'password'}
                            control={Input}
                            label='Confirm Password'
                            placeholder='password'
                            required
                            name={'passwordConfirm'}
                            onChange={changeHandler}
                        />
                        <Button.Group>
                            <Form.Field
                                control={Button}
                                basic color='green'
                                type={'submit'}
                                content={'Sign Up'}
                                disabled={loading}
                            />
                            <Button.Or/>
                            <Form.Field
                                control={Button}
                                type={'button'}
                                content={'Sign In'}
                                basic color='blue'
                                onClick={() => history.push('/auth')}
                            />
                        </Button.Group>
                    </Form>
                    {
                        message ? (<MessageHook message={message}/>) : ('')
                    }
                </Segment>
            </Grid.Column>
        </Grid>
    )
};
export default withRouter(RegPage);
