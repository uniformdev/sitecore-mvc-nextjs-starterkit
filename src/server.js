const uniformConfig = require('./uniform.config');
const { createPublishProvider } = require('@uniformdev/publishing-all');
uniformConfig();

const { server } = require('@uniformdev/next-server');
const { serverLogger } = require('./utils/logging/serverLogger');

server({ logger: serverLogger, publishProvider: createPublishProvider(), });
