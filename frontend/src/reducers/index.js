import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from './UserReducer';
import RoomsReducer from './RoomsReducer';

const reducers = combineReducers({
  user: UserReducer,
  rooms: RoomsReducer
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));