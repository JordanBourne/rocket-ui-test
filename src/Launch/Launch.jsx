import React from 'react';
import RocketDetails from '../Rocket/RocketDetails';

const Launch = ({ launch, expandedView, setExpandedView }) => {
  const showExpandedDetails = expandedView === launch.flight_number + launch.mission_name;

  const updateExpandedView = () => {
    if (showExpandedDetails) {
      setExpandedView('')
    } else {
      setExpandedView(launch.flight_number + launch.mission_name)
    }
  }

  return (
    <li className="noBulletList launchDetailContent">
      <h2 className="launchHeader" onClick={() => updateExpandedView()}><span className="expandIcon">{showExpandedDetails ? '-' : '+'}</span> {launch.mission_name}</h2>
      <div> Flight Number: {launch.flight_number} </div>
      {showExpandedDetails && <RocketDetails rocketId={launch.rocket.rocket_id} />}
    </li>
  );
};

export default Launch;
