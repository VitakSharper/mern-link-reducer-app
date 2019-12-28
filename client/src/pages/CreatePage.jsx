import React, {useEffect, useState, useContext} from "react";
import {useHistory} from 'react-router-dom';
import {Button, Form, Grid, Input, Segment} from "semantic-ui-react";
import {useHttp} from "../hooks/http.hook";
import MessageHook from "../hooks/Message.component";
import {AuthContext} from "../context/AuthContext";

const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [url, setUrl] = useState({from: ''});
    const {loading, message, request, clearMessage} = useHttp();

    useEffect(() => {
        clearMessage();
    }, [message, clearMessage]);


    const changeHandler = (e) => {
        setUrl({from: e.target.value})
    };
    const handleSubmit = async () => {
        const response = await request('/api/links/generate', 'POST', url, {
            Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${response.link._id}`);
    };

    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Segment>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field
                            type={'text'}
                            control={Input}
                            label='Url'
                            placeholder='some.com'
                            required
                            onChange={changeHandler}
                            value={url.from}
                        />

                        <Form.Field
                            control={Button}
                            basic color='green'
                            type={'submit'}
                            content={'Encode Url'}
                        />
                    </Form>
                    {
                        message ? (<MessageHook message={message}/>) : ('')
                    }
                </Segment>
            </Grid.Column>
        </Grid>
    )
};
export default CreatePage;
