import React, {useState} from "react";
import {withRouter} from 'react-router-dom';
import {Grid, Segment, Form, Input, Button, Label} from "semantic-ui-react";
import {useHttp} from "../hooks/http.hook";

const classes = {
    segment: {
        background: 'linear-gradient( #42A5F5,#E3F2FD)',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    }
};

const AuthPage = ({history}) => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({email: '', password: ''});

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };


    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Segment style={classes.segment}>
                    <Label as='p' color='blue' ribbon={'right'}>
                        Sign In
                    </Label>
                    <Form>
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
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};
export default withRouter(AuthPage);
