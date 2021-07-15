const EventEmitter = require('events');

class CustomEventEmitter extends EventEmitter {
  names = this.eventNames;
}

module.exports = new CustomEventEmitter();
