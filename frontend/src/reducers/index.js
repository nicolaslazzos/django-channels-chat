import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from './UserReducer';
import RoomsReducer from './RoomsReducer';
import MessagesReducer from './MessagesReducer';

const reducers = combineReducers({
  user: UserReducer,
  rooms: RoomsReducer,
  messages: MessagesReducer,
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));