import React, {useState, useContext, useCallback, useEffect} from "react";
import {Grid, Segment} from "semantic-ui-react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import LoaderComponent from "../components/Loader.component";
import LinkCard from "../components/LinkCard.component";

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/links', 'GET', null, {Authorization: `Bearer ${token}`});
            setLinks(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <LoaderComponent/>
    }
    return (
        <Segment>
            {!links.length && <p>Empty Links</p>}
            <Grid>
                <Grid.Row columns={3}>
                    {!loading && links.length > 0 && links.map(link => (
                        <Grid.Column style={{marginBottom: '1rem'}} key={link._id}>
                            <LinkCard link={link}/>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </Segment>
    )
};
export default LinksPage;
