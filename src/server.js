const _config = require('./_config');
_config();

const { server } = require('@uniformdev/next-server');
const { serverLogger } = require('./utils/logging/serverLogger');

server({ logger: serverLogger });
