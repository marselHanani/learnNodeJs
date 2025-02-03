// A logger is a tool used for recording messages about the execution of an application.
// It helps in tracking errors, debugging issues, and monitoring application behavior.
// is Simplifies debugging, identifies issues, supports multiple log levels,  
// writes logs to various outputs, and improves application maintenance
//* we will use winston library to log messages because it provides more features 
//? to install the library write in terminal (npm i winston)

// i want make the logger in this format => date + log level + message 
                    // => [2022-06-21 16:53:12] info: Server is listening on port 3000
const winston = require('winston');
const path = require('path');

class LoggerService {
    constructor(route) {// to create logger file for each file that i use logger inside it 
        this.route = route;
        this.logger = winston.createLogger({// to create logger and determine his settings 
            format: winston.format.combine(// عشان ادمج اكثر من اشي مع بعض زي هون الوقت مع الفورمات تاعها 
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message, obj }) => {
                    let msg = `[${timestamp}] | ${level}: ${message} |`;
                    return obj ? `${msg} | data: ${JSON.stringify(obj)}` : msg;
                })
            ),
            transports: [
                new winston.transports.Console(),  
                new winston.transports.File({ filename: path.join(__dirname, 'log', `${route}.log`) })
                // to create the files inside folder named log 
            ]
        });
    }

    log(level, message, obj = null) {
        this.logger.log({ level, message, obj });
    }

    info(message, obj) { this.log('info', message, obj); }
    debug(message, obj) { this.log('debug', message, obj); }
    error(message, obj) { this.log('error', message, obj); }
    warn(message, obj) { this.log('warn', message, obj); }
}

module.exports = LoggerService;
// to use it you must 
//1- require this file => const logger = require('../6_advanced/2_Logger/logger.services')
//2- create object from this class => logger = new logger("database_logger")
//3- use this object => logger.info(message, obj)
//see example in folder 5_database in method get 
