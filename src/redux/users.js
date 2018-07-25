import {SET_USERS, EDIT_USER, DELETE_USERS, CHANGE_LOGIN, USER_INFO,} from '../constants/actionTypes'

const defaultStore = {
    items: [],
    currentUser: {}
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
        case CHANGE_LOGIN:
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                currentUser: {...payload.user}
            };
        case EDIT_USER:
            return {
                ...state,
                currentUser: {...payload}
            };
        case DELETE_USERS:
            return {
                ...state,
                items: state.items.filter((el) => {
                    return el._id !== payload
                })
            };

        case USER_INFO:

            return {
                ...state,
                activeUser: {...payload}
            };


        default:
            return state;
    }
}