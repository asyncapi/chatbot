const EventEmitter = require('events');

class CustomEventEmitter extends EventEmitter {
  names() {
    return this.eventNames(...arguments);
  }
}

module.exports = new CustomEventEmitter();
