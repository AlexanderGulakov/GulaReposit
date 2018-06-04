import {
    CHANGE_LOGIN,
    SET_USERS,
    DELETE_USERS,
    GET_POSTS,
    CREATE_POST,
    DELETE_POST
} from '../constants/actionTypes'

export const changeLogin = (isLoggedIn) => {
    return {
        type: CHANGE_LOGIN,
        payload: isLoggedIn
    }
};

export const signUp = ({ name, mail, password, gender,age,country }, history) => {
    return (dispatch) => {
        fetch('http://localhost:3033/users/signUp', {
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
                gender,age,country
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
                console.log(err);
            })
    }
};

export const logIn = ({ mail, pass }) => {
    return (dispatch) => {
        fetch('http://localhost:3033/users/logIn', {
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
                    payload: true
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getPosts = () => {
    return (dispatch) => {
        fetch('http://localhost:3033/posts', {
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
                    type: GET_POSTS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
export const createPost = ({ title, body, description,userId,rating,created }, history) => {
    return (dispatch) => {
        fetch('http://localhost:3033/posts', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title, body, description,userId,rating,created
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
                return history.push('/posts')//после создания поста автоматически переходит на страницу со всеми постами
            })
            .catch((err) => {
                console.log(err);
            })
    }
};


export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3033/posts/${id}`, {
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
                    type: DELETE_POST,
                    payload: id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};



export const getUsers = () => {
    return (dispatch) => {
        fetch('http://localhost:3033/users', {
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

export const deleteUser = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3033/users/${id}`, {
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


