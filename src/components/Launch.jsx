import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRocketThunk } from '../actions/Rockets';

const Launch = ({ launch, expandedView, setExpandedView }) => {
  const { rocketDetails = {} } = useSelector(state => state.rockets);
  const dispatch = useDispatch();
  const showExpandedDetails = expandedView === launch.flight_number + launch.mission_name;

  useEffect(() => {
    if (showExpandedDetails) dispatch(fetchRocketThunk(launch.rocket.rocket_id));
  }, [showExpandedDetails]);

  const updateExpandedView = () => {
    if (showExpandedDetails) {
      setExpandedView('')
    } else {
      setExpandedView(launch.flight_number + launch.mission_name)
    }
  }

  return (
    <li onClick={() => updateExpandedView()}>
      <h2> { launch.mission_name } </h2>
      <div> Flight Number: { launch.flight_number } </div>
      {showExpandedDetails && (
        <ul>
          <li>Rocket ID: {launch.rocket.rocket_id}</li>
          <li>Cost Per Launch: { rocketDetails[launch.rocket.rocket_id] && rocketDetails[launch.rocket.rocket_id].cost_per_launch}</li>
          <li>Description: { rocketDetails[launch.rocket.rocket_id] && rocketDetails[launch.rocket.rocket_id].description}</li>
        </ul>
      )}
    </li>
  );
};

export default Launch;
