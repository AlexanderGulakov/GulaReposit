import {
    GET_POSTS,
    CREATE_POST,
    DELETE_POST
} from '../constants/actionTypes'

export const getPosts = () => {
    return (dispatch) => {
        fetch('/posts', {
            method: 'GET',
            credentials: 'include',
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
    const { _id } = data;
    const url = _id ? `/posts/${_id}` : '/posts';
    const method = _id ? 'PATCH' : 'POST';
    return (dispatch) => {
        fetch(url, {
            method,
            credentials: 'include',
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

            .catch((err) => {
                console.log(err);
            })
    }
};



export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`/posts/${id}`, {
            method: 'DELETE',
            credentials: 'include',
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

