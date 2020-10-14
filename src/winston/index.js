import moment from 'moment';
import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';
require('winston-daily-rotate-file');

const { combine, timestamp, label, printf, colorize, json } = format;

const timestampFormat = () =>
    moment()
        .format('YYYY-MM-DD hh:mm:ss')
        .trim();

const jsonFormat = printf(info =>
    JSON.stringify({
        timestamp: info.timestamp,
        label: info.label,
        level: info.level,
        message: info.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''),
    })
);
const consoleFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/log_file.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
        silent: process.env.NODE_ENV === 'test',
        format: combine(label({ label: 'Sarwa' }), timestamp({ format: timestampFormat }), json(), jsonFormat),
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        silent: process.env.NODE_ENV === 'test',
        format: combine(label({ label: 'Sarwa' }), timestamp({ format: timestampFormat }), colorize(), consoleFormat),
    }
};

const logger = createLogger({
    transports: [
        new transports.DailyRotateFile({
            ...options.file,
            datePattern: moment().format('YYYY-MM-DD'),
        }),
        new transports.Console(options.console),
    ],
    exitOnError: false,
});

logger.stream = {
    write(message) {
        logger.info(message);
    },
};

module.exports = logger;
