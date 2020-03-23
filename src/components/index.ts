const index: any = {};

// important! placeholder must be defined here to have exclusive access to index
import { BasePlaceholder } from '@uniformdev/next';

import { consoleLogger } from '../utils/logging/consoleLogger';

export class Placeholder extends BasePlaceholder {
    constructor(props) {
        super(props, index, consoleLogger);
    }
}

index.Placeholder = Placeholder;

export function getComponentsIndex() {
    return index;
}
