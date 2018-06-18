import {SET_USERS, LOG_OUT, DELETE_USERS, CHANGE_LOGIN, USER_INFO,} from '../constants/actionTypes'

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
                currentUser: { ...payload.user }
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
                activeUser: { ...payload.user }
            };


        default:
            return state;
    }
}