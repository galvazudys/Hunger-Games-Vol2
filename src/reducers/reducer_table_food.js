import { FETCH_TO_TABLE } from '../actions';
import { DELETE_FROM_TABLE } from '../actions';
import { FETCH_USERS_DATA } from '../actions';

export default function(state = [], action = {}) {
    switch (action.type) {
        case FETCH_TO_TABLE:
            return [action.payload, ...state];
        case DELETE_FROM_TABLE:
            return [
                ...state.slice(0, action.index[0]),
                ...state.slice(action.index[0] + 1)
            ];
        case FETCH_USERS_DATA:
            return action.payload;
        default:
            return state;
    }
}
