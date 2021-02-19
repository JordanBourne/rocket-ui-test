import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRocketThunk } from './rocketActions';
import './rocket.sass'

const RocketDetails = ({ rocketId }) => {
  const { rocketDetails = {} } = useSelector(state => state.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRocketThunk(rocketId));
  }, []);

  return (
    <div className="rocketDetailContent">
      <h3>Rocket Details</h3>
      <div><span className="detailTitle">Rocket ID:</span> {rocketId}</div>
      <div><span className="detailTitle">Cost Per Launch:</span> {rocketDetails[rocketId] && rocketDetails[rocketId].cost_per_launch}</div>
      <div><span className="detailTitle">Description:</span> {rocketDetails[rocketId] && rocketDetails[rocketId].description}</div>
    </div>
  );
};

export default RocketDetails;
