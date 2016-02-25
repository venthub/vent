# vent
A VentHub client for NodeJS

**CAUTION** Do not use with browserify, webpack, etc. for browser use. Please use the browser-friendly [vent-client](https://github.com/venthub/vent-client) for that.

## Installation
`npm i -S venthub-worker` should do the trick.

*Note:* This package uses [ws](https://npmjs.com/package/ws), and can benefit from its optional deps.

## Usage
```js
import Vent from 'venthub-worker';

// This will be called on every action recieved from the VentHub
function actionHandler(action) {
    console.log(JSON.stringify(action, null, 2); // pretty print the action
}

let vent = new Vent('venthub.server.io:3000', actionHandler);
vent.start(); // connect to VentHub @ venthub.server.io:3000

vent.dispatch({type: 'FOO'}) // dispatch this action to the VentHub (this WILL trigger the action handler)
.then(() => vent.dispatch({type: 'BAR'}))
.then(::vent.stop); // disconnect the Vent (notice the self-bind syntax, very experimental)
```

### Vent as an EventEmitter
Creating a Vent with no handler will cause it to emit every action as an event of its type, with its payload as the event data.
