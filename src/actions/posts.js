import {
    GET_POSTS,
    CREATE_POST,
    DELETE_POST
} from '../constants/actionTypes'

export const getPosts = () => {
    return (dispatch) => {
        fetch('/posts', {
            method: 'GET',
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
                    type: GET_POSTS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const createPost = (data) => {
    return (dispatch) => {
        fetch('/posts', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
                    type: CREATE_POST,
                    payload: resp.data
                })
            })
            // .then(() => {
            //     return history.push('/posts')//после создания поста автоматически переходит на страницу со всеми постами
            // })
            .catch((err) => {
                console.log(err);
            })
    }
};



export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`/posts/${id}`, {
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

