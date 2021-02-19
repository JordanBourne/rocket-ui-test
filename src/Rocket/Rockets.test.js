import { shouldFetchRocket } from './rocketActions';

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
