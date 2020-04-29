const _config = require('./uniform.config');
_config();

const { config: uniformConfig } = require('@uniformdev/next-server');

module.exports = uniformConfig();
