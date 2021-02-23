// here is the reason why we need to override Next.js _app.js
// See Next.js docs for more info: https://nextjs.org/docs/basic-features/built-in-css-support
import "../styles/bootstrap.min.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}