const _config = require('./_config');
_config();

const withPlugins = require('next-compose-plugins');
const withUniform = require('@uniformdev/next-server').config;
const { serverLogger } = require('./utils/logging/serverLogger');

const plugins = [
    [withUniform, { logger: serverLogger }],
];

const nextConfig = {};

module.exports = withPlugins(plugins, nextConfig);
