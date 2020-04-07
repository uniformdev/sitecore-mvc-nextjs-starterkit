const uniformConfig = require('./uniform.config');
uniformConfig();

const { server } = require('@uniformdev/next-server');
const { serverLogger } = require('./utils/logging/serverLogger');

server({ logger: serverLogger });
