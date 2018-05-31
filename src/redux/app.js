import { CHANGE_LOGIN } from '../constants/actionTypes'

const defaultStore = {
    isLoggedIn: true
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
                isLoggedIn: payload
            };

        default:
            return state;
    }
}