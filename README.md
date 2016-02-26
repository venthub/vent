# vent
A VentHub client for NodeJS and for the modern browser

## Installation
`npm i -S venthub-worker` should do the trick.

*Note:* This package uses [ws](https://npmjs.com/package/ws), and can benefit from its optional deps.

## Usage (NodeJS)
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

## Usage for the Modern Browser
*Note:* This package has no external deps, but does require native support for WebSockets, Promises, Arrow functions and Classes.

```js
import Vent from 'venthub-client/browser';

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

### A basic implicit link
This version of Vent might not have fancy events, but it does provide a simple one-liner to hook, say, a redux store to a VentHub.

```js
import React from 'react';
import {render as renderToDOM} from 'react-dom';
import { Provider } from 'react-redux';
import Vent from 'venthub-client/browser';
import store from './store/store';
import App from './components/main-page';

Vent.openLink('venthub.server.io:5000/', ::store.dispatch); // That's it! :)

renderToDOM(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-container')
);
```
