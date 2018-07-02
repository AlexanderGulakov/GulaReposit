import { GET_POSTS, CREATE_POST,EDIT_POST,POST_INFO, DELETE_POST } from '../constants/actionTypes'

const defaultStore = {
    items: [],
    currentPost:{}
};

export default (state = defaultStore, action) => {
    const {
        type,
        payload
    } = action;
//
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                items: [...payload]
            };
        case CREATE_POST:
            return {
                ...state,
                items: [...state.items, ...[payload]] // add new post to others
            };
        case EDIT_POST:
            const oldPost=state.items.find(function (el) {
                return el._id===payload._id;
            });
            const index = state.items.indexOf(oldPost);
            state.items.splice(index,1,payload);
            return {

                ...state,
                items: [...state.items]
            };
        case POST_INFO:

            return {
                ...state,
                currentPost: { ...payload }

            };
        case DELETE_POST:
            return {
                ...state,
                items: state.items.filter((el) => {
                    return el._id !== payload
                })
            };

        default:
            return state;
    }
}