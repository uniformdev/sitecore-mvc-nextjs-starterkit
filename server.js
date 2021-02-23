const uniformConfig = require('./uniform.config');
uniformConfig();

const { server } = require('@uniformdev/next-server');
const { createPublishProvider } = require('@uniformdev/publishing-all');

server({ 
    createPublishProvider : (options) => createPublishProvider(options),
});
