import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from './UserReducer';

const reducers = combineReducers({
  user: UserReducer
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));