import { shouldFetchLaunches } from './launchActions';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

describe('Launches', () => {
  it('should fetch launches', () => {
    const shouldFetch = shouldFetchLaunches({ launches: [] });
    expect(shouldFetch).toEqual(true);
  });
  it('should not fetch launches', () => {
    const shouldFetch = shouldFetchLaunches({ launches: [{ launch_number: 1 }] });
    expect(shouldFetch).toEqual(false);
  });
});
