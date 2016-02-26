'use strict';

class Vent {
    constructor(ventUrl, actionHandler) {
        this._ventUrl = ventUrl;
        this.client = null;
        this._opened = new Promise(resolve => this._resolver = resolve);
        this.actionHandler = actionHandler;
    }

    get ventUrl() {
        return 'ws://' + this._ventUrl;
    }

    start() {
        this.client = new WebSocket(this.ventUrl);
        this.client.onopen = this._resolver;
        if (this.actionHandler) {
            this.client.onmessage = message => {
                let action = JSON.parse(message.data);
                this.actionHandler(action);
            };
        }
    }

    stop() {
        this.client.close();
        this._opened = new Promise(resolve => this._resolver = resolve);
        this.client = null;
    }

    dispatch(action) {
        return this._opened.then(() => this.client.send(JSON.stringify(action)));
    }

    static openLink(ventUrl, actionHandler) {
        const link = new Vent(ventUrl, actionHandler);
        link.start();
    }
};

module.exports = Vent;