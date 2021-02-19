import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import Launch from './Launch';


configure({ adapter: new Adapter() });

const mockStore = {
  getState: () => ({
    rockets: { rocketDetails: {} }
  }),
  subscribe: () => 'some value',
  dispatch: () => {}
}

describe('app', () => {
  const mockLaunch = {
    mission_name: 'Test Mission',
    flight_number: '1',
    rocket: {
      rocket_id: 'falcon9'
    }
  };
  const mockSetExpandedViewFn = () => {};


  it('renders with flight number', () => {
    const badMockLaunchId = 'someOtherLaunchId';
    const wrapper = mount(<Provider store={mockStore}>
      <Launch launch={mockLaunch} expandedView={badMockLaunchId} setExpandedView={mockSetExpandedViewFn} />
    </Provider>);
    expect(wrapper.text()).toContain('Flight Number:');
    expect(wrapper.text()).not.toContain('Rocket ID');
  });
  it('renders with flight number + expanded info', () => {
    const correctLaunchId = mockLaunch.flight_number + mockLaunch.mission_name;

    const wrapper = mount(<Provider store={mockStore}>
      <Launch launch={mockLaunch} expandedView={correctLaunchId} setExpandedView={mockSetExpandedViewFn} />
    </Provider>);
    expect(wrapper.text()).toContain('Flight Number:');
    expect(wrapper.text()).toContain('Rocket ID');
  });
  it('on click it updates expandedView to equal that launches Id', () => {
    let mockLaunchId = "someOtherLaunch";
    const mockWorkingSetExpandedViewFn = (launchId) => {
      mockLaunchId = launchId;
    }

    const wrapper = mount(<Provider store={mockStore}>
      <Launch launch={mockLaunch} expandedView={mockLaunchId} setExpandedView={mockWorkingSetExpandedViewFn} />
    </Provider>);
    expect(wrapper.text()).toContain('Flight Number:');
    expect(wrapper.text()).not.toContain('Rocket ID');
    // Click once to set it equal to the id
    wrapper.find('h2').simulate('click');
    expect(mockLaunchId).toEqual(mockLaunch.flight_number + mockLaunch.mission_name);
  });
  it('on click it updates expandedView to clear it when already was equal', () => {
    let mockLaunchId = mockLaunch.flight_number + mockLaunch.mission_name;
    const mockWorkingSetExpandedViewFn = (launchId) => {
      mockLaunchId = launchId;
    }

    const wrapper = mount(<Provider store={mockStore}>
      <Launch launch={mockLaunch} expandedView={mockLaunchId} setExpandedView={mockWorkingSetExpandedViewFn} />
    </Provider>);
    expect(wrapper.text()).toContain('Flight Number:');
    expect(wrapper.text()).toContain('Rocket ID');
    // Click once to clear it, since it was already equal
    wrapper.find('h2').simulate('click');
    expect(mockLaunchId).toEqual('');
  });
});
