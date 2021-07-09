const EventEmitter = require('events');

const events = module.exports;
const eventEmitter = new EventEmitter();

events.on = eventEmitter.on.bind(eventEmitter);
events.once = eventEmitter.once.bind(eventEmitter);
events.emit = (eventName, eventPayload) => {
  eventEmitter.emit(eventName, eventPayload);
};
events.names = eventEmitter.eventNames.bind(eventEmitter);
