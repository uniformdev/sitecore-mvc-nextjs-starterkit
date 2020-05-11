// this file is not required, but it provides default standard values for the starter kit
// it is moved to the separate file because it is used in 2 places: server.ts and next.config.js
// you can override the values in the .env file if required
module.exports = function() {
    process.env.PORT = 3000;
    process.env.UNIFORM_API_SITENAME = 'HabitatPreview';
    process.env.UNIFORM_OPTIONS_MVC_SUPPORT = 'true';    
    process.env.UNIFORM_OPTIONS_MVC_MODE = 'mvconly';    
    process.env.UNIFORM_OPTIONS_DEBUG = '1';

    //process.env.UNIFORM_PUBLISH_NEXT_BUILD_COMMAND = 'echo Compiled successfully.';
    process.env.UNIFORM_OPTIONS_MVC_SPA_ENABLED = 'false';

    process.env.UNIFORM_PUBLISH_TARGET = 'azureblob',
    process.env.AZURE_CONTAINER='$web';

    process.env.UNIFORM_EXPORT_PREFETCH_ENABLED = 'false';
    process.env.UNIFORM_MODE = 'mixed';
    process.env.UNIFORM_PUBLISH_PREFETCH_REQUEST_TIMEOUT = '10000';
}
