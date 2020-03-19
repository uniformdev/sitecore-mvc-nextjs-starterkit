const _config = require('./_config');
_config();

const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');
const withProgressBar = require('next-progressbar');
const withImages = require('next-images');
const withUniform = require('@uniformdev/next-server').config;
const { serverLogger } = require('./utils/logging/serverLogger');

function withCustomWebpack(config = {}) {
    const { webpack } = config;

    config.webpack = (webpackConfig, options) => {
        // webpack is invoked twice for next apps, once for client build and once for server build.
        // During the client build, we need to stub some built-in node modules in order for the build
        // to succeed. Long-term, we should try to ensure the sample apps are not referencing modules
        // that are intended to be used on the server only, e.g. `winston`.
        if (!options.isServer) {
            // https://github.com/webpack-contrib/css-loader/issues/447 - similar case
            webpackConfig.node = webpackConfig.node || { fs: 'empty' };
        }

        return webpack(webpackConfig, options);
    };

    return config;
}

const plugins = [
    [withTypescript],
    [withUniform, { logger: serverLogger }],
    [withCustomWebpack],
    [withCSS, { cssLoaderOptions: { url: false } }],
    [withProgressBar],
    [withImages],
];

const nextConfig = {};

module.exports = withPlugins(plugins, nextConfig);
