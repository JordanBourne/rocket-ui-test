import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LaunchCollectionReducer from './Launch/launchReducers';
import RocketReducer from './Rocket/rocketReducers';

const rootReducer = combineReducers({
  launchCollection: LaunchCollectionReducer,
  rockets: RocketReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
