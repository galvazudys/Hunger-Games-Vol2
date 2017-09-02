import { SIGN_IN } from '../actions';

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case SIGN_IN:
            return action.payload;
        default:
            return state;
    }
}
