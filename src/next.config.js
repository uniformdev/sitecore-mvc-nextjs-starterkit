const _config = require('./uniform.config');
_config();

const { uniformNextConfig } = require('@uniformdev/next-server');

module.exports = uniformNextConfig();
