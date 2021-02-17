import React from 'react';

const Launch = ({ launch, expandedView, setExpandedView }) => {
  const thisLaunchIsExpanded = expandedView === launch.flight_number;
  const updateExpandedView = () => {
    if (thisLaunchIsExpanded) {
      setExpandedView('')
    } else {
      setExpandedView(launch.flight_number)
    }
  }

  // implement curl --location --request GET 'https://api.spacexdata.com/v3/rockets' api to get the cost per launch and detail

  return (
    <li onClick={() => updateExpandedView()}>
      <h2> { launch.mission_name } </h2>
      <div> Flight Number: { launch.flight_number } </div>
      {thisLaunchIsExpanded && (
        <ul>
          <li>Rocket ID: {launch.rocket.rocket_id}</li>
          <li>Cost Per Launch: costPerLaunch</li>
          <li>Description: description</li>
        </ul>
      )}
    </li>
  );
};

export default Launch;
