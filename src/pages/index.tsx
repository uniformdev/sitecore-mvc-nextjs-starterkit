import React from 'react';

// Uniform
import { parseUniformConfig } from '@uniformdev/common';
import { PageProps, getPageProps } from '@uniformdev/common-client';
import { PageComponent, UniformContext, getNextConfig } from '@uniformdev/next';

// App
import { Placeholder } from '../components';
import { consoleLogger } from '../utils/logging/consoleLogger';

// Page
export default class extends React.Component<PageProps> {
    static async getInitialProps(arg: any) {
        return await getPageProps(arg.asPath, parseUniformConfig(getNextConfig()), consoleLogger);
    }

    render() {
        return (
            <UniformContext.Provider value={{ logger: consoleLogger }}>
                <PageComponent {...this.props} components={{}}>
                    {(renderingContext) => (
                        <Placeholder placeholderKey="/" renderingContext={renderingContext} />
                    )}
                </PageComponent>
            </UniformContext.Provider>
        );
    }
}
