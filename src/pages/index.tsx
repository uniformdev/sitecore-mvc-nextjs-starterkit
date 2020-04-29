import React from 'react';

// Uniform
import { PageProps } from '@uniformdev/common-client';
import { BasePlaceholder, PageComponent, UniformContext, getNextPageProps, consoleLogger, } from '@uniformdev/next';

// Components Index
const componentsIndex: any = {};

/* uncomment this to enable Spinner to be a default loader for all components with personalization
// Global Loader
//   When any component has personalization enabled, the loader component replaces the actual component 
//   for the first few moments on the page while personalization rules are deciding what to show)
import { GLOBAL_LOADER } from '@uniformdev/next';
index[GLOBAL_LOADER] = Spinner;
*/

// PageHeaderMediaCarousel Loader 
//   When the PageHeaderLoader component has personalization enabled, the loader component replaces the actual component 
//   for the first few moments on the page while personalization rules are deciding what to show)
import { COMPONENT_LOADER_SUFFIX } from '@uniformdev/next';
import { PageHeaderLoader } from "../components";
componentsIndex["PageHeaderMediaCarousel" + COMPONENT_LOADER_SUFFIX] = PageHeaderLoader;

class Placeholder extends BasePlaceholder {
  constructor(props) {
    super(props, componentsIndex, consoleLogger);
  }
}

componentsIndex.Placeholder = Placeholder;

// Page
export default class extends React.Component<PageProps> {
    static async getInitialProps(arg: any) {
        return await getNextPageProps(arg);
    }

    render() {
        return (
            <UniformContext.Provider value={{ logger: consoleLogger }}>
                <PageComponent {...this.props} components={componentsIndex}>
                    {(renderingContext) => (
                        <Placeholder placeholderKey="/" renderingContext={renderingContext} />
                    )}
                </PageComponent>
            </UniformContext.Provider>
        );
    }
}
