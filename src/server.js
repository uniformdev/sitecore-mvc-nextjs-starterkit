const _config = require('./_config');
_config();

const { readdirSync, realpathSync } = require('fs')

const { server } = require('@uniformdev/next-server');
const { serverLogger } = require('./utils/logging/serverLogger');
var printDir = dir => {
    const entities = readdirSync(dir, { withFileTypes: true });

    entities
        .filter(x => x.isDirectory())
        .map(x => x.name !== 'node_modules' 
            ? printDir(dir + '/' + x.name)
            : serverLogger.info(dir + '/node_modules/** (skip)'));

    entities
        .filter(x => !x.isDirectory())
        .map(x => serverLogger.info(dir + '/' + x.name));      
}

serverLogger.info('Files of ' + realpathSync('.')); 
printDir('.'); 

serverLogger.info('Env: ' + JSON.stringify(process.env));

server({ logger: serverLogger });
