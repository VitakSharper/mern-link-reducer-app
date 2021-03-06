import {useState, useCallback, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);


    const signin = useCallback((jwtToken) => {
        const {id} = jwtDecode(jwtToken);

        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem('userData', JSON.stringify({userId: id, token: jwtToken}))
    }, []);

    const signout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        if (data && data.token) {
            signin(data.token);
        }
        setReady(true);
    }, [signin]);

    return {signin, signout, token, userId, ready};
};

export default useAuth;
