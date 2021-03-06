import { SERVICES_URL, api } from '../apiService';

const serviceUrl = `${SERVICES_URL}/launches`;

const launchService = {
  get: () => api.get(`${serviceUrl}`)
};

export default launchService;
