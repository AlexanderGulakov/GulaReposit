import {
    CHANGE_LOGIN,
    SET_USERS,
    DELETE_USERS,
    USER_INFO,
    SIGNUP_ERROR
} from '../constants/actionTypes'

export const changeLogin = (isLoggedIn) => {
    return {
        type: CHANGE_LOGIN,
        payload: {
            isLoggedIn: isLoggedIn
        }
    }
};

export const signUp = ({name, mail, password, gender, age, country}, history) => {
    return (dispatch) => {
        fetch('/users/signUp', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                mail,
                password,
                gender, age, country
            })
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
                return history.push('/logIn')
            })
            .catch((err) => {
                const errorOb = err.message;
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: errorOb
                })
            })
    }
};

export const logIn = ({mail, pass}) => {
    return (dispatch) => {
        fetch('/users/logIn', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail,
                pass
            })
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
                    type: CHANGE_LOGIN,
                    payload: {
                        isLoggedIn: true
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const checkSession = (history) => {
    return (dispatch) => {
        fetch('/users/checkAuthentication?type=text', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
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
                    type: CHANGE_LOGIN,
                    payload: {
                        user: resp.user,
                        isLoggedIn: true
                    }
                })
            })
            .catch((err) => {
                return history.push('/logIn')
            })
    }
};


export const getUsers = () => {
    return (dispatch) => {
        fetch('/users', {
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

export const getUserInfo = (user) => { //action Creater.
    alert("Now user is:"+user.name);
    return {
        type: "USER_INFO",
        payload: user //В редакс принято, что если мы хотим передать какой-то объект, то мы называем ключ payload + обєкт який ми будем передавати
    }
};

export const deleteUser = (id) => {
    return (dispatch) => {
        fetch(`/users/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
                    type: DELETE_USERS,
                    payload: id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

