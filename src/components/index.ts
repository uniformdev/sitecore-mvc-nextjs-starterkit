const index: any = {};

// important! placeholder must be defined here to have exclusive access to index
import { BasePlaceholder, COMPONENT_LOADER_SUFFIX } from '@uniformdev/next';

import { consoleLogger } from '../utils/logging/consoleLogger';

/* uncomment this to enable Spinner to be a default loader for all components with personalization

import { GLOBAL_LOADER } from '@uniformdev/next';
index[GLOBAL_LOADER] = Spinner;
*/

// enable Spinner to be a loader for PageHeaderMediaCarousel component when it is used with personalization
import { Spinner } from './Spinner';
index['PageHeaderMediaCarousel' + COMPONENT_LOADER_SUFFIX] = Spinner;

export class Placeholder extends BasePlaceholder {
    constructor(props) {
        super(props, index, consoleLogger);
    }
}

index.Placeholder = Placeholder;

export function getComponentsIndex() {
    return index;
}
