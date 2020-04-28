import React from 'react';

// Uniform
import { BasePlaceholder, PageComponent, UniformContext, getNextPageProps, consoleLogger, } from '@uniformdev/next';

// Components Index
const componentsIndex = {};

class Placeholder extends BasePlaceholder {
  constructor(props) {
    super(props, componentsIndex, consoleLogger);
  }
}

componentsIndex.Placeholder = Placeholder;

// Page
export default class extends React.Component {
    static async getInitialProps(arg) {
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
