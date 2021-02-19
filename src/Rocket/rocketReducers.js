import { ACTIONS } from './rocketActions';

const initialState = {
  rocketsDetails: {},
  fetching: false
};

const actionHandlers = {
  [ACTIONS.REQUEST_ROCKET]: ({ state }) => ({
    ...state,
    fetching: true
  }),
  [ACTIONS.RECEIVE_ROCKET]: ({ state, action }) => ({
    ...state,
    fetching: false,
    rocketDetails: {
      ...state.rocketDetails,
      [action.payload.rocketId]: action.payload.rocketDetails
    }
  })
};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
