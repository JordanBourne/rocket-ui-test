import LaunchService from '../services/LaunchService';

export const ACTIONS = {
  REQUEST_LAUNCHES: 'REQUEST_LAUNCHES',
  RECEIVE_LAUNCHES: 'RECEIVE_LAUNCHES'
};

export const requestLaunches = () => ({
  type: ACTIONS.REQUEST_LAUNCHES
});

const receiveLaunches = response => ({
  type: ACTIONS.RECEIVE_LAUNCHES,
  payload: {
    launches: response.data
  }
});

export const fetchLaunchesThunk = () => {
  return (dispatch, getState) => {
    const { launchCollection } = getState();
    return fetchLaunchesIfNeeded({ dispatch, launchCollection});
  }
}

export const fetchLaunches = dispatch => {
  dispatch(requestLaunches());
  return LaunchService.get().then(response => dispatch(receiveLaunches(response)));
};

export const shouldFetchLaunches = launchCollection => !launchCollection.launches.length && !launchCollection.fetching;

export const fetchLaunchesIfNeeded = ({ dispatch, launchCollection }) =>
  shouldFetchLaunches(launchCollection) && fetchLaunches(dispatch);
