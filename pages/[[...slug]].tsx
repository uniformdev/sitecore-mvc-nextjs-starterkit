import React from "react";
import {
  createConsoleLogger,
  getNextPageProps,
  isExportProcess,
  NextPageProps,
  PageComponent,
  Placeholder,
  UniformContextProvider,
} from "@uniformdev/next";

import { HtmlPreProcessingInstruction } from "@uniformdev/next";

const formPreProcessingInstruction: HtmlPreProcessingInstruction = {
  shouldPreprocessNode: (node: any) => {
    return (
      node.name === "form" &&
      node.attribs.action &&
      node.attribs.action.startsWith("/formbuilder")
    );
  },
  preprocessNode: (node: any) => {
    node.attribs.action = "/api/form";
  },
};

// Register React components here if you migrate from MVC to React
const componentsIndex: any = {};

// Root page handling all pages coming from Uniform Page Service API
const Page = function (props: NextPageProps) {
  return (
    <UniformContextProvider
      logger={createConsoleLogger()}
      componentMap={componentsIndex}
      htmlPreProcessingInstructions={[formPreProcessingInstruction]}
    >
      <PageComponent {...props}>
        {(renderingContext) => (
          <Placeholder placeholderKey="/" renderingContext={renderingContext} />
        )}
      </PageComponent>
    </UniformContextProvider>
  );
};

// Using Automatic Static Optimization
export async function getStaticPaths() {
  // await import is essential here because getStaticPaths only server-side and import must only happen server side (on client-side the code will blow up)
  const { getStaticPaths } = await import("@uniformdev/next-server");

  if (isExportProcess()) {
    // If we are exporting the site directly or via a publish
    // specify all static paths and let nextjs handle 404
    return {
      paths: await getStaticPaths(),
      fallback: false,
    };
  } else {
    // If we are running the site in dynamic preview then
    // handle all paths and render them on the fly
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  const asPath = "/" + (params?.slug?.join("/") || "");
  const props = await getNextPageProps({ asPath });
  return { props };
}

export default Page;
