const _config = require('./uniform.config');
_config();

const { server, FakePublishProvider } = require('@uniformdev/next-server');

server({ publishProvider: new FakePublishProvider()});
