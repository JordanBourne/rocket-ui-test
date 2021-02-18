import React, { useEffect, useState } from 'react';
import ConnectedView from './ConnectedView';
import { fetchLaunchesThunk } from "../actions/Launches";
import Launch from '../components/Launch';
import { useDispatch, useSelector } from 'react-redux';

const LaunchesView = () => {
  const [ expandedView, setExpandedView ] = useState('');
  const launchCollection = useSelector(state => state.launchCollection);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaunchesThunk())
  }, []);

  const getContent = () => {
    if (!launchCollection || launchCollection.fetching) {
      return <div> LOADING </div>;
    }

    if (!launchCollection.launches.length) {
      return <div> NO DATA </div>;
    }

    return (
      <ul>
        {launchCollection.launches.map(launch => (
          <Launch {...{
            key: launch.flight_number + launch.mission_name,
            launch,
            expandedView,
            setExpandedView
          }} />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2> SpaceX launches </h2>
      {getContent()}
    </div>
  );
};

export default ConnectedView(LaunchesView, 'launches');
