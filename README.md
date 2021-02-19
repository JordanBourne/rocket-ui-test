## Summary of the work

A quick summary of the work that was done in decreasing necessity

### Bugfixes

**Error in shouldFetchLaunches:**
```
const shouldFetchLaunches = launchCollection => !launchCollection || !launchCollection.fetching;`
```

This resulted in re-fetching the launches whenever the component was re-rendered and the fetch had already been completed, so I added an extra check to make sure we did not already have results: 
```
(!launchCollection.launches.length && !launchCollection.fetching)
```

**launch_id is not an existing property**

```
<Launch {...{
  key: launch.launch_id,
  launch
}} />
```

In the initial implementation of the Launch component, the key is the `launch_id` that does not exist. I created a new unique identifier for each launch by combining `launch_number` + `mission_name`. `launch_number` was insufficient itself, since there were two launches numbered 110 for some reason.

```
<Launch {...{
  key: launch.flight_number + launch.mission_name,
  launch,
  expandedView,
  setExpandedView
}} />
```


### New Features

The majority of the new code was of course implementing the new feature providing the rocket details, as well as controlling the collapsibility of them.

**Collapse feature**

For the collapse feature, I chose to go with setting state `expandedView` in the parent component `<Launches>`, where the value would be the unique identifier of a launch mentioned above `launch_number` + `mission_name`. Each child component `<Launch>` would then compare its own value against the one passed in through props to know if it should be expanded or not: 
```
const showExpandedDetails = expandedView === launch.flight_number + launch.mission_name;

...

{showExpandedDetails && <RocketDetails rocketId={launch.rocket.rocket_id} />}

...
```

I think using state to manage the collapsing of each component is sufficient since we do not care to persist the state when navigating away and back, or on any refresh. Other options if we did care about some of those things would be to store the `expandedView` value in the redux store, or if we really wanted to we could store it as a query param in the url so someone could send a link to the page with a specific one already expanded, but both of those would have been overkill in my opinion.

**Fetching rocket details**

Ignoring the rework of the redux interactions by introducing hooks for now (more on that later), this was a fairly straightforward implementation of a new set of actions, reducers, and a service for calling a new api endpoint with a rocket to get the extra details. The biggest thing to note here is probably the logic around checking whether an api call should be made and how it stores the info to preserve previous calls and not have to re-fetch any rocket info that was previously grabbed when going back and forth between falcon1 and falcon9 rocket details for example.

`rocketActions.js` checking to see if that specific rocket has been fetched
```
export const shouldFetchRocket = (rocketDetails, rocketId) => !rocketDetails || (!rocketDetails.fetching && !rocketDetails[rocketId]);
```
`rocketReducers.js` saving the new rocket info without overwriting previous rocket info
```
rocketDetails: {
  ...state.rocketDetails, 
  [action.payload.rocketId]: action.payload.rocketDetails
}
```

### Refactoring

**Turning class components into function components**

Function components, along with hooks, are the modern way to write React and the de facto standard at this point as far as I understand. `Launches.jsx` was previously a class component and has been reworked to be a function component, and the redux props that were previously passed in were converted into hooks `useSelector` and `useDispatch`.

**The thunk pattern**

In order to use `useDispatch` with asynchronous action creators, I included `redux-thunk` in the project. Normally `dispatch` is called with an event object, but the `thunk` middleware allows such behavior, for example:

```
export const fetchRocketThunk = (rocketId) => {
  return (dispatch, getState) => {
    const { rockets: { rocketDetails } } = getState();
    return fetchRocketIfNeeded({ dispatch, rocketDetails, rocketId});
  }
}
```

which is called by 
```
dispatch(fetchRocketThunk(rocketId));
```

Strictly speaking this isn't necessary, and you can import the store into the actions file and just define some function that would look approximately like
```
export const fetchRocketAction = (rocketId) => {
  store.dispatch(getRocketRequestAction))
  service.getRocket(rocketId)
    .then(res => {
      store.dispatch(getRocketResultAction)
    })
}
```
and could then be called in a component directly. Importing the store directly doesn't sit well with me though, but I'm not sure I could construct an objective reason why one approach would be better than the other.

**File Structure**

This one is definitely low on the list of priorities, if it could be considered a priority at all, which is why I saved it for last once everything was working well. The project structure as organized now is designed keeping in mind that most work that needs to be done will be surrounding a specific feature, so it aims to keep everything you would need to modify all in the same place without having to constantly go back and forth between folders for the actions, reducers, components etc. The biggest drawback of this project structure is probably if you have a lot of components or files that are shared between features, it can be difficult to keep in mind how everything interacts or where to place certain files. I'm not strongly attached to one project structure over another, but I thought it would be an interesting experiment to see how it felt with this project.

***
## Original Instructions

This repo contains a small UI project written in React. Unfortunately it has many errors and 
outmoded coding practices, particularly in Launches.jsx, the components and the actions. The Layout, routing,
stores and services are more up to date (although feel free to give feedback in the form of commments or make fixes if you think significant improvements are possible and you want to take the time — but they're not necessarily intended to be in scope of the challenge.)

The repo is designed to be simple to start and run with just npm and any recent version of node.
It is built on webpack and uses the webpack development server, so all you should need to do is clone the
repo and start the app in development mode with npm start and view it on port 7357. All the tools 
for writing code should be included, but feel free to add additional dependencies if you find that
helps you.

 While the code is intentionally a little dirty around the edges in the hopes you will show us how you would 
 clean it up, you should be able to follow the general react/redux and REST pattern for loading data and 
 outputting UI elements.

The app pulls data about launches from the public SpaceX api.

**Your task**

- Add a feature where clicking on any given launch will expand that launch and reveal more info about the rocket used in the launch (specifically we'll want to see the Rocket ID, Cost Per Launch, and Description)
- Clicking on another launch will cause the currently expanded launch to close, and expand the one that was clicked instead
- If a launch is already expanded, clicking on it again will close it

Feel free to add files, breakup components or modularize and generally clean up code (Please be weary of time! First get it working).
Place more emphasis on usability than graphic design, code with the assumption that colors, borders and margins might change
according to forthcoming design requirements and your job is to get the feature working in a well structured way.

The development challenge is build against the space-x public REST API `https://documenter.getpostman.com/view/2025350/RWaEzAiG`
You should be able to easily find the information there make the call and extract the data needed.

Good Luck.

### What were using

* React 16 (includes Hooks should you want to use them)
* Webpack 4
* React Router 4
* SASS
* Babel Cli
* Hot Module Reloading
* Jest 21 
* Enzyme 3 for testing (should you have time to implement tests)

### Features

* Simple src/index.jsx and src/index.css (local module css).
* Webpack configuration for development (with hot reloading) and production (with minification).
* Both js(x) and css hot loaded during development.
* [Webpack Dashboard Plugin](https://github.com/FormidableLabs/webpack-dashboard) on dev server.

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Fork and clone the project:

```
git clone https://github.com/seamusmalone/ui-test-base
```

* Then install the dependencies:

```
npm install
```

* Run development server:

```
npm start
```

* Or you can run development server with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard):

```
npm run dev
```

Open the web browser to `http://localhost:7357/`


### To test
To run unit tests:

```
npm test
```

Tests come bundled with:

* Jest
* Enzyme
* React Test Utils
* React Test Renderer
