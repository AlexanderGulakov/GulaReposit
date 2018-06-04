import { SET_USERS } from '../constants/actionTypes'

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

        default:
            return state;
    }
}