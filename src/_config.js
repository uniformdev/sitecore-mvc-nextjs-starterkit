const dotenv = require('dotenv');

// this file is not required, but it provides default standard values for the starter kit
// it is moved to the separate file because it is used in 2 places: server.ts and next.config.js
// you can override the values in the .env file if required
module.exports = function() {
    dotenv.config();
    process.env.PORT = process.env.PORT || '3000';
    process.env.UNIFORM_API_SITENAME = process.env.UNIFORM_API_SITENAME || 'HabitatPreview'
    process.env.UNIFORM_API_URL = process.env.UNIFORM_API_URL || 'http://habitat.dev.local'
    process.env.UNIFORM_DATA_URL = process.env.UNIFORM_DATA_URL || 'http://habitat.dev.local'
    process.env.UNIFORM_OPTIONS_MVC_SUPPORT = process.env.UNIFORM_OPTIONS_MVC_SUPPORT || 'true';
    process.env.UNIFORM_PUBLISH_TARGET = process.env.UNIFORM_PUBLISH_TARGET || 'netlify',
    process.env.UNIFORM_API_TOKEN = process.env.UNIFORM_API_TOKEN || '1234'
}
