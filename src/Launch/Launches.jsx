import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConnectedView from '../Layout/ConnectedView';
import { fetchLaunchesThunk } from './launchActions';
import Launch from './Launch';
import './launch.sass';

const LaunchesView = () => {
  const [ expandedView, setExpandedView ] = useState('');
  const launchCollection = useSelector(state => state.launchCollection);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaunchesThunk());
  }, []);

  const getContent = () => {
    if (!launchCollection || launchCollection.fetching) {
      return <div> LOADING </div>;
    }

    if (!launchCollection.launches.length) {
      return <div> NO DATA </div>;
    }

    return (
      <ul className="launchesContainer">
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
      <h2 className="launchHeader"> SpaceX launches </h2>
      {getContent()}
    </div>
  );
};

export default ConnectedView(LaunchesView, 'launches');
