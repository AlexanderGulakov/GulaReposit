import { ADD_COMMENT } from '../constants/actionTypes'

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

        case ADD_COMMENT:
            return {
                ...state,
                currentPost: { ...payload },
                items: [...state.items, ...[payload]]
            };

        default:
            return state;
    }
}