import React from "react";
import Document, { Main } from "next/document";
import { CustomHead } from "../components";

// When Sitecore solution does not have personalization rules and when it does not require SPA-navigation
// it makes sense to disable all nextjs scripts to minimize javascript bundle and fit performance budget.

// CustomDocument replaces stock.js Document component to replace stock Head component
export default class CustomDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        {/* CustomHead replaces stock Next.js Head component to disable prefetching links */}
        <CustomHead />
        <body className="header-static">
          <Main />
        </body>
      </html>
    );
  }
}

// Uncomment and use this default document when enabling uniform personalization / tracking SDK
// export default class CustomDocument extends Document {
//   render() {
//       return (
//           <Html lang="en">
//               <Head/>
//               <body className="header-static">
//                   <Main />
//                   <NextScript />
//               </body>
//           </Html>
//       );
//   }
// }
