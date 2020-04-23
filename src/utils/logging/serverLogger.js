const { createLogger, format, transports } = require('winston');
const { parseUniformConfig } = require('@uniformdev/common');

const { combine, timestamp, colorize, printf } = format;

function paddy(text, padlen) {
    if (padlen <= text.length) return text;

    return ' '.repeat(padlen - text.length) + text;
}

const loggerTransports = [];

const config = parseUniformConfig(process.env);
const consoleTransport = new transports.Console({
    level: config.UNIFORM_OPTIONS_DEBUG ? 'debug' : 'info',
    format: combine(
        timestamp({ format: 'MM/dd-HH:mm:ss' }),
        colorize({ all: true, colors: { debug: 'grey' } }),
        printf((info) => {
            const { timestamp, level, message, ...args } = info;

            // const ts = timestamp.slice(0, 19).replace('T', ' ');
            const lvl = paddy(level, 'debug'.length + 10); // 10 is for color special chars
            return `${timestamp} ${lvl}: ${message} ${
                Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
            }`;
        })
    ),
});

loggerTransports.push(consoleTransport);

if (typeof window === 'undefined') {
    const fileTransport = new transports.File({ filename: '.debug.log', level: 'debug' });
    loggerTransports.push(fileTransport);

    const key = process.env.TIMBER_KEY;
    const id = process.env.TIMBER_ID;

    if (key && id) {
        const { Timber } = require("@timberio/node");
        const { TimberTransport } = require("@timberio/winston");
        const timber = new Timber(key, id);

        // Create a Winston logger - passing in the Timber transport
        loggerTransports.push(new TimberTransport(timber));
    }
}

const serverLogger = createLogger({
    transports: loggerTransports,
});

if (config.UNIFORM_OPTIONS_DEBUG) {
    serverLogger.debug('Logging initialized at debug level');
}

module.exports = {
    serverLogger,
};
