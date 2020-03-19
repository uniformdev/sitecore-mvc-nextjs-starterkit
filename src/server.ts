const _config : any = require('./_config');
_config();

import { server } from '@uniformdev/next-server';
import { serverLogger } from './utils/logging/serverLogger';


server({ logger: serverLogger });
