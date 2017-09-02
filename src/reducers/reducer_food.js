import { FETCH_FOOD } from '../actions/index';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_FOOD:
            return [action.payload, ...state];
        default:
            return state;
    }
}
