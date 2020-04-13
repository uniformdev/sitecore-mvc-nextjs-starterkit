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

    const { Timber } = require("@timberio/node");
    const { TimberTransport } = require("@timberio/winston");
    const timber = new Timber("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS50aW1iZXIuaW8vIiwiZXhwIjpudWxsLCJpYXQiOjE1ODYyNDg2NjUsImlzcyI6Imh0dHBzOi8vYXBpLnRpbWJlci5pby9hcGlfa2V5cyIsInByb3ZpZGVyX2NsYWltcyI6eyJhcGlfa2V5X2lkIjo3MjY1LCJ1c2VyX2lkIjoiYXBpX2tleXw3MjY1In0sInN1YiI6ImFwaV9rZXl8NzI2NSJ9.UaBeETwAgrAvs19BaPL8jHVOFC4ADOjWTVy9FN8sm0g", "35906");

    // Create a Winston logger - passing in the Timber transport
    loggerTransports.push(new TimberTransport(timber));
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
