const dotenv = require('dotenv');

// this file is not required, but it provides default standard values for the starter kit
// it is moved to the separate file because it is used in 2 places: server.ts and next.config.js
// you can override the values in the .env file if required
module.exports = function() {
    dotenv.config();
    process.env.PORT = process.env.PORT || '3000';
    process.env.UNIFORM_API_SITENAME = 'Habitat';
    process.env.UNIFORM_API_URL = 'https://cranky-panini-ef102e.netlify.com/'; // static netlify site with copied sitemap
    process.env.UNIFORM_DATA_URL = 'https://habitat92.blob.core.windows.net/data'
    process.env.UNIFORM_OPTIONS_MVC_SUPPORT = 'true';
    process.env.UNIFORM_PUBLISH_TARGET = 'none',
    process.env.UNIFORM_API_TOKEN = process.env.UNIFORM_API_TOKEN || '1234';
    process.env.UNIFORM_EXPORT_PREFETCH_ENABLED = 'false';
    process.env.UNIFORM_MODE = 'publish';
    process.env.UNIFORM_PUBLISH_FAKE_PUBLIC_URL = 'http://localhost:1234';
    process.env.UNIFORM_PUBLISH_PREFETCH_REQUEST_TIMEOUT = '10000';
}
