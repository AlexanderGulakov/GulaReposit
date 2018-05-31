import { SET_USERS, DELETE_USERS } from '../constants/actionTypes'

const defaultStore = {
    items: []
};

export default (state = defaultStore, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case SET_USERS:
            return {
                ...state,
                items: [...payload]
            };
        case DELETE_USERS:
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