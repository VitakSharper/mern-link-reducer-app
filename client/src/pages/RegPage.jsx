import React, {useState} from "react";
import {withRouter} from 'react-router-dom';
import {Grid, Segment, Form, Input, Button, Label} from "semantic-ui-react";
import {useHttp} from "../hooks/http.hook";

const classes = {
    segment: {
        background: 'linear-gradient(#81C784,#E8F5E9)',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid #29B6F6'
    }
};


const RegPage = ({history}) => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({email: '', password: ''});

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };


    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Segment style={classes.segment}>
                    <Label as='p' color='green' ribbon={'right'}>
                        Sign Up
                    </Label>
                    <Form>
                        <Form.Field
                            type={'email'} control={Input} label='Email' placeholder='joe@schmoe.com'
                            required
                        />
                        <Form.Field type={'password'} control={Input} label='Password' placeholder='password' required/>
                        <Form.Field type={'password'} control={Input} label='Confirm Password' placeholder='password'
                                    required/>
                        <Button.Group>
                            <Form.Field control={Button} basic color='green' type={'submit'} content={'Sign Up'}/>
                            <Button.Or/>
                            <Form.Field
                                control={Button} type={'button'} content={'Sign In'}
                                basic color='blue'
                                onClick={() => history.push('/auth')}
                            />
                        </Button.Group>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};
export default withRouter(RegPage);
