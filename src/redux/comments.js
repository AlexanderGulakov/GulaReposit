import { ADD_COMMENT,DELETE_COMMENT,EDIT_COMMENT } from '../constants/actionTypes'

const defaultStore = {
    items: [],
    currentComment:{},
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
        case DELETE_COMMENT:
            return {
                ...state,
                items: state.items.filter((el) => {
                    return el._id !== payload
                })
            };
        case EDIT_COMMENT:
            const oldComment=state.items.find(function (el) {
                return el._id===payload._id;
            });
            const index = state.items.indexOf(oldComment);
            state.items.splice(index,1,payload);
            return {

                ...state,
                items: [...state.items]
            };

        default:
            return state;
    }
}