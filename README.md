# Uniform starter kit for Sitecore MVC and Next.js

This repo contains both the starter kit with content items and required configuration files.

This kit can be used to complete the official tutorial and to kick off a new project. There are minimal dependencies in this kit, and not functional components.

## Docs

1. [Tutorial for this starter kit](https://docs.uniform.dev/sitecore/deploy/getting-started/sitecore-mvc-tutorial)

1. [Uniform for Sitecore docs](https://docs.uniform.dev/sitecore/deploy/introduction/)

## Pre-requisites
1. Sitecore 9.0.2 - 10.x instance.
1. "Uniform for Sitecore" installed and configured on your Sitecore instance. Check out the docs.
1. Install the Sitecore package with items from `/sitecore/App_Data/packages` folder.
1. Deploy the configs from `/sitecore/App_Config` folder to your Sitecore instance's `App_Config` folder (the subfolder structure should match).

## Getting started with the app

> Check out official docs for more scenarios and [tutorial](https://docs.uniform.dev/sitecore/deploy/getting-started/sitecore-mvc-tutorial).

### TL;DR version

1. Configure `.env` file according to your environment specifics (see `.env-example` file).
1. `npm install`
1. Add `NPM_TOKEN` environment variable with the value we provided you with.
1. `npm run start` to start the SSR server.
2. `npm run export:deploy` to run static expor.


**Note:** Remove or update the `robots.txt` if you going to use this kit in production