# Uniform starter kit for Sitecore MVC (Habitat) and Next.js

 [![Netlify Status](https://api.netlify.com/api/v1/badges/4e39f7cc-4dc2-4ed1-a1fc-47797f91a659/deploy-status)](https://app.netlify.com/sites/uniform-sitecore-mvc-nextjs/deploys)


## Demo

This is the latest deployment of this starter, [served from Netlify](https://uniform-sitecore-mvc-nextjs.netlify.com/).

## Value prop

Uniform enables [JAMstack](https://jamstack.wtf/) style architecture for your Sitecore solution allowing to statically generate the whole site at build-time and deploy to your delivery platform of choice (this app is setup with Netlify, Azure and AWS S3 but it can work with virtually any combination of file/blob storage + CDN).

On top of that, Uniform unlocks **origin-less** tracking and personalization where marketing users assign personalization in Sitecore the usual way but **execution** part is deferred to the edge (depending on the CDN of choice) or client-side without paying the cost of going back to the origin content delivery server - unlocking the benefits of performance and scale of Content Delivery Networks with personalized experiences.

## "Magic button"

Can you do JAMstack if you are running a Sitecore MVC front-end? Yes!
This starter kit showcases how you can "JAMstackify" and existing Sitecore MVC site running on any 8.x / 9.x (using Sitecore Habitat) with no changes to the your codebase. The approach allows reusing existing presentation layer (C# / Razor) and is using Next.js framework for page re-assembly at build-time, which also enables you to gradually rebuild the components in React one by one and reuse the underlying Sitecore content infrastructure.

## Sitecore version compatibility

While this starter kit has been tested for Sitecore 9.2, however, it is expected to work fine with Sitecore 9.3 and in fact is compatible with any 8.x and 9.x version.
[Contact us](mailto:hi@unfrm.io) if you are on an earlier version.

## Next.js role

This starter kit is using [Next.js 9.3](https://nextjs.org/), a battleground tested React Framework, which is also capable of doing static site export, essentially acting as a static site generator.

There are multiple reasons why we are using Next.js in this context:

1. Allowing to gradually replace your Sitecore MVC renderings with React, component by component.
1. Leveraging outstanding server-side rendering option that Next.js provides out of the box. This is critical to retain Sitecore Experience Editor and Preview functionality.
1. Leveraging utilities such as routing, the plugin system and many other enhancements that improve Developer Experience and help with building fast sites.

## Repo structure

- `/sitecore` - the required configuration file to drop into your Sitecore intance with some setting overrides enabling smoother operation of Uniform.
- `/src` - the sources of the React/Next.js app boilerplate wired up with Uniform plugin.
- `/docs` - documentation

## Pre-requisites

1. `Uniform.Sitecore.zip` package provided by the folks @ Uniform ([contact us for details](mailto:hi@unfrm.io)).
1. Uniform license key provided by the folks @ Uniform ([contact us for details](mailto:hi@unfrm.io)).
1. npm token provided by the folks @ Uniform ([contact us for details](mailto:hi@unfrm.io)).
1. Unmodified original Habitat running on top of Sitecore 9.2.

   > If you have an installed Habitat 9.2 locally, please make sure it is unmodified and **verify** it is operational at http://habitat.dev.local as it will make the configuration much easier.

   > If you need to deploy Habitat, feel free to use [our Habitat 9.2 fork](https://github.com/uniformdev/habitat) (we upgraded `gulp` to be compatible with last nodejs version) or the [official one](https://github.com/Sitecore/Habitat) which is no longer maintained.

## Setting up the server-side

1. Install the provided `Uniform.Sitecore.zip` package via Sitecore Desktop => Installation Wizard.

1. Copy the `sitecore\config\Habitat.UniformSettings.config` file to your Sitecore instances' `App_Config\Include\zzz` folder.

   > This config file changes some Sitecore setting default, which are required for smooth operation of Uniform connector for Sitecore. The comments in the config file explain why these settings need to be changed.

1. Update your Sitecore instance's `App_Config\ConnectionStrings.config` file by adding the following two connection strings:

   - `uniform.api.token` with the `1234` value:

     ```
       <add name="uniform.api.token" connectionString="1234" />
     ```

     > This value will be used to secure the deployment endpoint during Sitecore publishing and should be changed to a secret value in non-developer environments. The same value should be used when setting the `UNIFORM_API_TOKEN` environment variable (see below).

   - `Uniform.LicenseKey` with the value of Uniform license key you've received:

     <add name="Uniform.LicenseKey" connectionString="LICENSE-KEY-GOES-HERE" />

> Since these connection strings may not change frequently in development environment, consider adding these connection strings globally to IIS Manager (stored in `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\config\web.config`):

1.  Open IIS Manager
1.  Select your computer name in the tree on the left
1.  Select Connection Strings
1.  Click Add in the right panel
1.  Fill in the dialog with values from bulleted list above

```
Name: connection-string-name
( ) SQL Server
(x) Custom
   .------------------------
   | connection-string-value
```

### Quick test of the server-side

Verify everything is working by making request to `http://your-sitecore-instance/api/map/habitat` and `http://your-sitecore-instance/api/page/habitat`

> Please note that the last part of the url above (`habitat`) corresponds to the site name.

You are expected to get valid HTTP 200 response with JSON data.

## Setting up the app

1. (Optional) Provide environment variables

   If your Sitecore host name is the same as the default (`http://habitat.dev.local`), you can skip this step.

   Otherwise, you may need to override the defaults of some environment variables (defaults are set in `uniform.config.js`).

   Create `.env` file with connection details to your Sitecore dev instance.

   ```
   UNIFORM_API_URL=http://habitat92sc.dev.local
   UNIFORM_DATA_URL=http://habitat92sc.dev.local
   ```

   > For multi-lingual solutions, if your are not using the default `en` language for your site's content, you will need to adjust the value of the `UNIFORM_API_DEFAULT_LANGUAGE` to the ISO code of the content language you are using.

   > Instead of specifying the `.env` file, you can use system environment variables instead.

1. (Optional) connecting via HTTPS. Add the following parameter if connecting to Sitecore instance over HTTPs, as you may experience connection issue due to the certificates:

   ```
   NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

1. Set the `NPM_TOKEN` environment variable with the value we provided you with.

   You can use `$Env:NPM_TOKEN="your-npm-token here"` in PowerShell or `export NPM_TOKEN="your-npm-token here"` in Bash.

   > This variable is used within the `.npmrc` file located next to `package.json`
   > So alternatively, simply replace `${NPM_TOKEN}` within `.npmrc` file with the value we provided you with.

   ```bash
   //registry.npmjs.org/:_authToken=npm-token-guid
   ```

1. Install all the dependencies with `npm install`

1. Start development server with `npm start` and open `http://localhost:3000/` to access the app.

## Static export

Run `npm run export` to perform build and export of your Habitat site into the `/out` folder.

The process should complete with `"Export successful"`.

You can serve the static version with any file server now. To test, run `npx serve out` to verify the exported version renders as expected.

> "Serve" is a global npm package that will start a simple web server on http://localhost:5000

You are now ready to deploy your statically generated Habitat site to virtually any delivery environment.

## Handling media / images

As of now, media/image support is not availble in public version of Uniform ([contact us](mailto:hi@unfrm.io) if you need this capability now).

In meantime, there are multiple alternatives as to how you can configure media handling for your JAMstackified Sitecore site:

1. Have your Sitecore Content Delivery origin handle Media Library requests (this is enabled with `Media.AlwaysIncludeServerUrl=true` setting enabled in `Habitat.UniformSettings.config` config patch included in this repo).
1. Configure a "pull-based" CDN for Sitecore Media Library - [it is quite straightforward](https://doc.sitecore.com/developers/91/sitecore-experience-manager/en/manually-configure-the-sitecore-media-library-to-use-a-cdn.html). Besides the usual suspects, such as Akamai, Cloudflare and Cloudfront, there is a set of cool smart image CDNs to consider that are very much plug and play:
   - [CloudImage](https://www.cloudimage.io/)
   - [Cloudinary](https://cloudinary.com/)
   - [Piio](http://piio.co/)

## Deployment

### Netlify

Netlify is known as a great platform for the JAMstack sites and it is not only the new origin for your built site, it is also the build environment.

1. Create an account at Netlify.com and log in.
2. Create new token via [Create a new personal access token](https://app.netlify.com/user/applications/personal) page
3. Add the following additional environment variables to the `.env` file located next to your `package.json` file.

   ```
   UNIFORM_PUBLISH_TARGET=Netlify
   NETLIFY_ACCESS_TOKEN=your-token-here
   ```

   > For convenience of your development environment, you may want to consider saving these as system environment variables instead (check [this guide](https://helpdeskgeek.com/how-to/create-custom-environment-variables-in-windows/) if unfamiliar with env variables).

4. Run `npm run deploy:netlify` to perform build, export and deployment to Netlify ADN.

   At the end of the process, the following message will be shown in console indicating success:

   ```
   Deploying wait-for-deploy start Waiting for deploy to go live...
   Deploying wait-for-deploy stop Deploy is live!
   NetlifyPublishProvider deployed site files: out
   ```

5. The Netlify site url will be shown in the newly created `netlify.config.json` file.

While this approach allows you to run the build on any server and deploy to Netlify, you would probably want to have Netlify do the build and deploy. This is easy - simply create a new site in Netlify connected to the fork of this repo in your git based source control and specify the same environment variables in build settings. In this case, you can skip specifying the `NETLIFY_ACCESS_TOKEN` environment variable.

When creating the site, specify the following build settings:

![Netlify build settings](docs/images/netlify-build-settings.png "Netlify build settings")

Afterwards, make sure that you add the following Environment variables in the newly created sites' dashboard under `/settings/deploys`:

![Netlify build-time environment variables](docs/images/netlify-env-vars.png "Netlify build-time environment variables")

The following environment variables are must haves. If any of these settings differ from defaults in `uniform.config.js` you would need to specify those in Netlify:

```
UNIFORM_API_TOKEN=1234
UNIFORM_API_URL=http://your-sc-host
UNIFORM_DATA_URL=http://your-sc-host
UNIFORM_API_SITENAME=habitat
UNIFORM_API_DEFAULT_LANGUAGE=en
NPM_TOKEN=<the value of the npm token received from us>
```

Since Netlify will connect to your Sitecore instance, consider setting up a tunnel to your local Sitecore instance if you don't have it deployed publicly yet with something like ngrok: `ngrok http -host-header="ABCsc.dev.local" ABCsc.dev.local:80`

### Azure Blob Storage

1. Provision a Blob Storage account in Azure in the desired region.

1. Create a container called `$web`.

1. In Azure Portal, open the "Static website" settings for your Azure Blob container

   ![Azure Static website](docs/images/azure-static-website.png "Azure Static website")

1. Make sure this setting is enabled and it is associated with the `$web` container created above.

1. Copy the value of `Primary endpoint` into the clipboard. It should looks something along with this: `https://ABC.web.core.windows.net/`

   ![Azure Static website primary endpoint](docs/images/azure-static-endpoint.png "Azure Static website primary endpoint")

1. Add the following additional environment variables to the `.env` file located next to your `package.json` file.

   ```

   UNIFORM_PUBLISH_TARGET=azureblob

   # This is the value of the "Primary endpoint" from the blob container:
   UNIFORM_PUBLISH_AZUREBLOB_PUBLIC_URL=https://ABC.web.core.windows.net/

   # name of the blob container:
   AZURE_CONTAINER=$web

   # Key 1 / connection string for your blob container:
   AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...

   ```

   > The value for `AZURE_STORAGE_CONNECTION_STRING` can be retrieved from the "Access keys" page of your Azure Blob Storage account, under "Key 1 / Connection string".

1. `npm run deploy:azure` to perform the app export and deployment of static application artifacts to your Azure Blob storage container.

The static version of the Habitat site is now expected to be served from this endpoint.

### AWS S3

1. Make sure you have the AWS credentials for a user with `AmazonS3FullAccess` policy. Specifically, the `Access key Id` and a `Secret access key`.

1. Add the following additional environment variables to the `.env` file located next to your `package.json` file.

   > For the time being, put an arbitrary value into `UNIFORM_PUBLISH_AWSS3_PUBLIC_URL`. After the first deployment, which also provisions the S3 bucket, the value for this variable can be extracted from `aws.config.json` file.

   ```
   UNIFORM_PUBLISH_TARGET=awss3
   AWS_ACCESS_ID=[AWS Access Key ID]
   AWS_SECRET=[AWS Secret access key]
   AWS_REGION=[AWS region for the S3 bucket creation]
   # the endpoint of your S3 bucket (ex: http://abc.s3-website-us-west-1.amazonaws.com/)
   UNIFORM_PUBLISH_AWSS3_PUBLIC_URL=[YOUR SITE URL]
   ```

   > For convenience of your development environment, you may want to consider saving these as system environment variables instead (check [this guide](https://helpdeskgeek.com/how-to/create-custom-environment-variables-in-windows/) if unfamiliar with env variables).

1. Run `npm run deploy:aws`. This will provision the S3 bucket with "Static site hosting" settings and will deploy the contents of the `out` folder to it. At the end of the process, you should see the following in the console and the `aws.config.json` will be created in the project root:

   ```
   AwsS3PublishProvider deployed site files: out
   ```

### Other deployment targets

Please [contact us](mailto:hi@unfrm.io) if your deployment to your CDN / hosting environment is not documented, it should be possible :)

## Other things you can do

### Migrate MVC components to React one-by-one

Uniform extracts HTML output of every individual MVC rendering and passes this alongside with other page information. When NextJs constructs the page (either on the server or in client) it still uses bare React component to represent this HTML, so swapping MVC component with React one is just the matter of disabling HTML extraction and changing rendering name. 

This guide shows how to swap MVC component with React one for the entire Sitecore instance, not page-by-page:

1.  Prepare React component to swap to

    *   Create `src/components/HelloWorld.tsx` file as follows:
   
        ```
        import * as React from 'react';
        import { Component } from '@uniformdev/next';
        export class HelloWorld extends Component {
            render() {
                return (
                    <div>Hello World! This is a React component.</div>
                );
            }
        }
        ```
     
    *   Register the `HelloWorld` component in the `src/components/index.ts` file:
    
        ```
        ...
        import { HelloWorld } from "./HelloWorld";
        index.HelloWorld = HelloWorld;

        export function getComponentsIndex() {
            return index;
        }
        ```

2.  Update the rendering definition item

    *   Open e.g. `/sitecore/layout/Renderings/Feature/Media/Page Header Media Carousel`
    *   Rename it to `HelloWorld` (must match `index.HelloWorld = ...` above)
    *   Click `Ribbon -> Configure -> Change (in the template chunk)`
    *   Choose `/Templates/Uniform/JavaScript Rendering`

### Configure deployment on Sitecore publish

WIP

### Setting up Preview server

WIP

### Adding origin-less tracking

WIP

### Adding origin-less personalization

WIP
