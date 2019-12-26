import React, {useCallback} from 'react';

import MessageHook from "./Message";

const useMessage = ({error}) => {
    return useCallback(text => {
        if (text) {
            console.log('useMessage: ', text)
            return (
                <MessageHook/>
            )
        }
    }, [])
};

export default useMessage;
