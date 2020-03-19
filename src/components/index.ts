const index: any = {};

// important! placeholder must be defined here to have exclusive access to index
import { BasePlaceholder } from '@uniformdev/next';
export class Placeholder extends BasePlaceholder {
    constructor(props) {
        super(props, index);
    }
}

index.Placeholder = Placeholder;

export function getComponentsIndex() {
    return index;
}
