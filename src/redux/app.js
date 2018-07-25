import {CHANGE_LOGIN, SIGNUP_ERROR} from '../constants/actionTypes'

const defaultStore = {
    isLoggedIn: false,
    errors: {},
    currentUser: {}
};

export default (state = defaultStore, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case CHANGE_LOGIN:
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                currentUser: payload.user
            };

        case SIGNUP_ERROR:
            return {
                ...state,
                errors: {...payload}
            };

        default:
            return state;
    }
}