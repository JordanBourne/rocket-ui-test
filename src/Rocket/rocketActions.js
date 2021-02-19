import RocketService from './rocketService';

export const ACTIONS = {
  REQUEST_ROCKET: 'REQUEST_ROCKET',
  RECEIVE_ROCKET: 'RECEIVE_ROCKET'
};

export const requestRocket = () => ({
  type: ACTIONS.REQUEST_ROCKET
});

const receiveRocket = (response, rocketId) => ({
  type: ACTIONS.RECEIVE_ROCKET,
  payload: {
    rocketId,
    rocketDetails: response.data
  }
});

export const fetchRocketThunk = rocketId => {
  return (dispatch, getState) => {
    const {
      rockets: { rocketDetails }
    } = getState();
    return fetchRocketIfNeeded({ dispatch, rocketDetails, rocketId });
  };
};

export const fetchRocket = (dispatch, rocketId) => {
  dispatch(requestRocket());
  return RocketService.getRocket(rocketId).then(response =>
    dispatch(receiveRocket(response, rocketId))
  );
};

export const shouldFetchRocket = (rocketDetails, rocketId) =>
  !rocketDetails || (!rocketDetails.fetching && !rocketDetails[rocketId]);

export const fetchRocketIfNeeded = ({ dispatch, rocketDetails, rocketId }) =>
  shouldFetchRocket(rocketDetails, rocketId) && fetchRocket(dispatch, rocketId);
