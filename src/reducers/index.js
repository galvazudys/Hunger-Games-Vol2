import { combineReducers } from 'redux';
import FoodReducer from './reducer_food';
import UserLogIn from './reducer_user';

export default combineReducers({ food: FoodReducer, user: UserLogIn });
