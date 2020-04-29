const _config = require('./uniform.config');
_config();

const { server } = require('@uniformdev/next-server');
const { AzurePublishProvider } = require('@uniformdev/publishing-azureblobstorage');

server({ publishProvider: new AzurePublishProvider() });
