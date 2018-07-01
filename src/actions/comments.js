import {
    ADD_COMMENT, DELETE_COMMENT

} from '../constants/actionTypes'

export const addComment = (data) => {

    return (dispatch) => {
        fetch('/comments/addComment', {
            method: 'POST',
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
                    type: ADD_COMMENT,
                    payload: resp.data
                })
            })

            .catch((err) => {
                console.log(err);
            })
    }
};
export const deleteComment = (id) => {
    return (dispatch) => {
        fetch(`/comments/${id}`, {
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
                    type: DELETE_COMMENT,
                    payload: id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
