import { FETCH_TO_TABLE } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_TO_TABLE:
            return [action.payload, ...state];
        default:
            return state;
    }
}
