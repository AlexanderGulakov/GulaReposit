import { ADD_COMMENT } from '../constants/actionTypes'

const defaultStore = {
    items: [],
    currentComment:{}
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
                currentComment: { ...payload },
                items: [...state.items, ...[payload]]
            };

        default:
            return state;
    }
}