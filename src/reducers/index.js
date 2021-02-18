import { combineReducers } from 'redux';

import LaunchCollectionReducer from './LaunchCollectionReducer';
import RocketReducer from './RocketReducer';

const rootReducer = combineReducers({
  launchCollection: LaunchCollectionReducer,
  rockets: RocketReducer
});

export default rootReducer;