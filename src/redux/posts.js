import { GET_POSTS, DELETE_POST } from '../constants/actionTypes'

const defaultStore = {
    items: []
};

export default (state = defaultStore, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                items: [...payload]
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