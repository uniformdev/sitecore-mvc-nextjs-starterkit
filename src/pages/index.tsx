import React from 'react';
import { NextContext } from 'next';

// Uniform
import { PageProps, getPageProps } from '@uniformdev/common-client';
import { PageComponent, UniformContext, parseUniformNextConfig } from '@uniformdev/next';

// App
import { Placeholder } from '../components';
import { consoleLogger } from '../utils/logging/consoleLogger';

// Page
export default class extends React.Component<PageProps> {
    static async getInitialProps(arg: NextContext) {
        return getPageProps(arg.asPath, parseUniformNextConfig(), consoleLogger);
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
