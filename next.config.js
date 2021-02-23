const uniformConfig = require('./uniform.config');
uniformConfig();

const { uniformNextConfig } = require('@uniformdev/next-server');

module.exports = uniformNextConfig();
