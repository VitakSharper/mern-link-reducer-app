import React, {useCallback, useState, useContext, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import LoaderComponent from "../components/Loader.component";
import LinkCard from "../components/LinkCard.component";
import {Button, Form, Grid, Input, Segment} from "semantic-ui-react";
import MessageHook from "../hooks/Message.component";

const DetailPage = () => {
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);

    const getLink = useCallback(async () => {
        try {
            const response = await request(`/api/links/detail/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`});
            setLink(response);
        } catch (e) {

        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <LoaderComponent/>
    }

    return (
        <Grid centered columns={2}>
            <Grid.Row>
                <Segment textAlign='center'>
                    {!loading && link && <LinkCard link={link}/>}
                </Segment>
            </Grid.Row>
        </Grid>
    )
};
export default DetailPage;
