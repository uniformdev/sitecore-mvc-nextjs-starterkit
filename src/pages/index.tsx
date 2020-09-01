import React from "react";

// Uniform
import {
  BasePlaceholder,
  PageComponent,
  UniformContext,
  NextPageProps,
  getNextPageProps,
  createConsoleLogger,
} from "@uniformdev/next";

// Components Index
const componentsIndex: any = {};

import { COMPONENT_LOADER_SUFFIX } from "@uniformdev/next";
import { PageHeaderLoader } from "../components";

componentsIndex[
  "PageHeaderMediaCarousel" + COMPONENT_LOADER_SUFFIX
] = PageHeaderLoader;

class Placeholder extends BasePlaceholder {
  constructor(props) {
    super(props, componentsIndex, createConsoleLogger());
  }
}

componentsIndex.Placeholder = Placeholder;

const Page = function (props: NextPageProps) {
  const logger = createConsoleLogger();
  return (
    <UniformContext.Provider value={{ logger }}>
      <PageComponent {...props} components={componentsIndex}>
        {(renderingContext) => (
          <Placeholder placeholderKey="/" renderingContext={renderingContext} />
        )}
      </PageComponent>
    </UniformContext.Provider>
  );
};

Page.getInitialProps = async function (arg: any) {
  return await getNextPageProps(arg);
};

export default Page;
