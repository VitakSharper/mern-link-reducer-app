import React, {useCallback} from 'react';

import MessageComponent from "./Message.component";

const useMessage = ({error}) => {
    console.log('Component: ', error)
    return useCallback(text => {
        if (text) {
            return (
                <MessageComponent/>
            )
        }
    }, [])
};

export default useMessage;
