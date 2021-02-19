import { SERVICES_URL, api } from '../apiService';

const serviceUrl = `${SERVICES_URL}/rockets`;

const rocketService = {
  getRocket: rocketId => api.get(`${serviceUrl}/${rocketId}`)
};

export default rocketService;
