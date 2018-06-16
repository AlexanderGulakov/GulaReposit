import { GET_POSTS, CREATE_POST, DELETE_POST } from '../constants/actionTypes'

const defaultStore = {
    items: []
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