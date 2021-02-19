// import Adapter from 'enzyme-adapter-react-16';
import { shouldFetchRocket } from './rocketActions';

// configure({ adapter: new Adapter() });

describe('Rockets', () => {
  it('should fetch rocket', () => {
    const shouldFetch = shouldFetchRocket({}, 'rocketId');
    expect(shouldFetch).toEqual(true);
  });
  it('should fetch not rocket', () => {
    const shouldFetch = shouldFetchRocket({ rocketId: 'rocketDetails ' }, 'rocketId');
    expect(shouldFetch).toEqual(false);
  });
  it('should fetch rocket', () => {
    const shouldFetch = shouldFetchRocket({ rocketId: 'rocketDetails ' }, 'differentRocketId');
    expect(shouldFetch).toEqual(true);
  });
});
