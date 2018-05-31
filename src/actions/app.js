import {
    CHANGE_LOGIN,
    SET_USERS
} from '../constants/actionTypes'

export const changeLogin = (isLoggedIn) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_LOGIN,
            payload: isLoggedIn
        })
    }
};

export const getUsers = () => {
    return (dispatch) => {
        fetch('http://localhost:3032/users', {
            method: 'GET',
            // mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token': 'sas'
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: SET_USERS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};