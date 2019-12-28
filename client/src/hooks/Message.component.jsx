import React from 'react'
import {Message} from 'semantic-ui-react'

const MessageComponent = ({message}) => {
    console.log('Message: ', message)
    return (
        <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{message}</p>
        </Message>
    )
};

export default MessageComponent
