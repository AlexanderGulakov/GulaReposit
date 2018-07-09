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
        // case DELETE_COMMENT:
        //     return {
        //         ...state,
        //         items: state.items.filter((el) => {
        //             return el._id !== payload.comments._id
        //         })
        //     };

        default:
            return state;
    }
}