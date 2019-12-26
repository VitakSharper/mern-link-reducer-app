import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }
            const resp = await fetch(url, {method, body, headers});
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error(data.message.message || data.message.errmsg)
            }
            setLoading(false);
            setMessage('User created successful.');
            return data;
        } catch (e) {
            setLoading(false);
            setMessage(e.message);
            throw e;
        }
    }, []);

    const clearMessage = useCallback(() => setMessage(null), []);

    return {loading, request, message, clearMessage}
};
