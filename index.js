'use strict';

const EventsEmitter = require('events');
const WebSocket = require('ws');

class Vent extends EventsEmitter{
    constructor(ventUrl, actionHandler) {
        super();
        this._ventUrl = ventUrl;
        this.client = null;
        this._opened = new Promise(resolve => this._resolver = resolve);
        this.actionHandler = actionHandler ? actionHandler : (action => this.emit(action.type, action.payload));
    }

    get ventUrl() {
        return 'ws://' + this._ventUrl;
    }

    start() {
        this.client = new WebSocket(this.ventUrl);
        this.client.once('open', this._resolver);
        this.client.on('error', err => this.emit('error', err));
        this.client.on('message', message => {
            let action = JSON.parse(message);
            this.actionHandler(action);
        });
    }

    stop() {
        this.client.close();
        this._opened = new Promise(resolve => this._resolver = resolve);
        this.client = null;
    }

    dispatch(action) {
        return this._opened.then(() => this.client.send(JSON.stringify(action)));
    }
};

module.exports = Vent;