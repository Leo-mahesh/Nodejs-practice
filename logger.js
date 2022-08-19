

const EventEmmiter = require('events');
// const event = new EventEmmiter();

class LoggerEvent extends EventEmmiter {
     logger = () => {
        this.emit('logArgs',{id:1,name:"demo"})
    }
    
}


module.exports = LoggerEvent;