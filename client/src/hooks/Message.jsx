import React from 'react'
import {Message} from 'semantic-ui-react'

const MessageHook = ({message}) => {
    return (
        <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{message}</p>
        </Message>
    )
};

export default MessageHook
