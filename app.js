
// First Event js code

// const EventEmmiter = require('events');
// const event = new EventEmmiter();


// event.on("log",() => {
//     console.log("my first event")
// })

// event.emit('log')


// Events With Argument



const Logger = require('./logger')
const logger = new Logger();

logger.on("logArgs",(args) => {
    console.log("my first event with args",args)
})
logger.logger();

