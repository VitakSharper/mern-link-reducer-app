import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'


const LinkCard = ({link}) => (
    <Card>
        <Card.Content>
            <Card.Header>
                Link</Card.Header>
            <strong>{link.from}</strong>
            <Card.Meta>
                <span className='date'>{new Date(link.date).toLocaleDateString()}</span>
            </Card.Meta>
            <Card.Description>
                How match clicks: <strong>{link.clicks}</strong>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a href={link.to} target={'_blank'} rel={'noopener noreferrer'}>
                <Icon name='linkify'/>
                Your Encoded LInk
            </a><br/>
            <a href={link.from} target={'_blank'} rel={'noopener noreferrer'}>
                <Icon name='linkify'/>
                From
            </a>
        </Card.Content>
    </Card>
);

export default LinkCard
