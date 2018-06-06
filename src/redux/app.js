
import { CHANGE_LOGIN, SIGNUP_ERROR } from '../constants/actionTypes'

const defaultStore = {
    isLoggedIn: true,
    errors: {}
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
                isLoggedIn: payload.isLoggedIn
            };

        case SIGNUP_ERROR:
            return {
                ...state,
                errors: { ...payload }
            };

        default:
            return state;
    }
}