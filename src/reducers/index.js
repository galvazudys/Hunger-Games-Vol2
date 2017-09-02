import { combineReducers } from 'redux';
import FoodReducer from './reducer_food';
import UserLogIn from './reducer_user';
import FetchToTable from './reducer_table_food';

export default combineReducers({
    food: FoodReducer,
    user: UserLogIn,
    tableFood: FetchToTable
});
