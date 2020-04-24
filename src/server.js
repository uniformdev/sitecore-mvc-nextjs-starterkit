const _config = require('./uniform.config');
_config();

const { server } = require('@uniformdev/next-server');
const { serverLogger } = require('./utils/logging/serverLogger');

server({ logger: serverLogger });
