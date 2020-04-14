const dotenv = require('dotenv');

// this file is not required, but it provides default standard values for the starter kit
// it is moved to the separate file because it is used in 2 places: server.ts and next.config.js
// you can override the values in the .env file if required
module.exports = function() {
    dotenv.config();
    process.env.PORT = 3000;
    process.env.UNIFORM_API_SITENAME = 'HabitatPreview';
    process.env.UNIFORM_DATA_URL = 'https://habitatuniform.blob.core.windows.net/data'
    process.env.UNIFORM_OPTIONS_MVC_SUPPORT = 'true';
    
    process.env.UNIFORM_OPTIONS_DEBUG = '1';

    //process.env.UNIFORM_PUBLISH_NEXT_BUILD_COMMAND = 'echo Compiled successfully.';

    process.env.UNIFORM_PUBLISH_TARGET = 'azureblob',
    process.env.AZURE_CONTAINER='$web';
    process.env.UNIFORM_PUBLISH_AZUREBLOB_PUBLIC_URL="https://habitatuniform.z1.web.core.windows.net/"

    process.env.UNIFORM_EXPORT_PREFETCH_ENABLED = 'false';
    process.env.UNIFORM_MODE = 'mixed';
    process.env.UNIFORM_PUBLISH_PREFETCH_REQUEST_TIMEOUT = '10000';
    

    process.env.UNIFORM_API_URL="https://habitat-uniform-461960-single.azurewebsites.net/"
process.env.UNIFORM_API_TOKEN="1234"
process.env.AZURE_STORAGE_ACCOUNT="habitatuniform"
process.env.AZURE_STORAGE_ACCESS_KEY="hDvrp2JNPD9GRjgDZefNIgWkZHjIMm8WWuRqPM73HKX1m8BA0pAdQbB/FZHyXCCMejh/VdiMETox/jiJaJ++Cw=="
}
