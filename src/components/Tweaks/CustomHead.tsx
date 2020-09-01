import React from 'react';
import { Head } from 'next/document';
import { cleanAmpPath } from 'next/dist/next-server/server/utils'

function getOptionalModernScriptVariant(path: string) {
  if (process.env.__NEXT_MODERN_BUILD) {
    return path.replace(/\.js$/, '.module.js')
  }
  return path
}

function getAmpPath(ampPath: string, asPath: string) {
  return ampPath ? ampPath : `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`
}

function getPageFile(page: string, buildId?: string) {
  if (page === '/') {
    return buildId ? `/index.${buildId}.js` : '/index.js'
  }

  return buildId ? `${page}.${buildId}.js` : `${page}.js`
}

export class CustomHead extends Head {
// extracted and modified next 9.3.1 Head.render()
render() {
    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
    } = this.context._documentProps

    let { head } = this.context._documentProps
    let children = this.props.children
    // show a warning if Head contains <title> (only in development)
    if (process.env.NODE_ENV !== 'production') {
      children = React.Children.map(children, (child: any) => {
        const isReactHelmet =
          child && child.props && child.props['data-react-helmet']
        if (child && child.type === 'title' && !isReactHelmet) {
          console.warn(
            "Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title"
          )
        }
        return child
      })
      if (this.props.crossOrigin)
        console.warn(
          'Warning: `Head` attribute `crossOrigin` is deprecated. https://err.sh/next.js/doc-crossorigin-deprecated'
        )
    }

    let hasAmphtmlRel = false
    let hasCanonicalRel = false

    // show warning and remove conflicting amp head tags
    head = React.Children.map(head || [], child => {
      if (!child) return child
      const { type, props } = child

      if (inAmpMode) {
        let badProp: string = ''

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"'
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (
            (props.src && props.src.indexOf('ampproject') < -1) ||
            (props.dangerouslySetInnerHTML &&
              (!props.type || props.type === 'text/javascript'))
          ) {
            badProp = '<script'
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`
            })
            badProp += '/>'
          }
        }

        if (badProp) {
          console.warn(
            `Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://err.sh/next.js/conflicting-amp-tag`
          )
          return null
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true
        }
      }
      return child
    })

    // try to parse styles from fragment for backwards compat
    const curStyles: React.ReactElement[] = Array.isArray(styles)
      ? (styles as React.ReactElement[])
      : []
    if (
      inAmpMode &&
      styles &&
      // @ts-ignore Property 'props' does not exist on type ReactElement
      styles.props &&
      // @ts-ignore Property 'props' does not exist on type ReactElement
      Array.isArray(styles.props.children)
    ) {
      const hasStyles = (el: React.ReactElement) =>
        el &&
        el.props &&
        el.props.dangerouslySetInnerHTML &&
        el.props.dangerouslySetInnerHTML.__html
      // @ts-ignore Property 'props' does not exist on type ReactElement
      styles.props.children.forEach((child: React.ReactElement) => {
        if (Array.isArray(child)) {
          child.map(el => hasStyles(el) && curStyles.push(el))
        } else if (hasStyles(child)) {
          curStyles.push(child)
        }
      })
    }

    return (
      <head {...this.props}>
        {children}
        {head}
        <meta
          name="next-head-count"
          content={React.Children.count(head || []).toString()}
        />
        {inAmpMode && (
          <>
            <meta
              name="viewport"
              content="width=device-width,minimum-scale=1,initial-scale=1"
            />
            {!hasCanonicalRel && (
              <link
                rel="canonical"
                href={canonicalBase + cleanAmpPath(dangerousAsPath)}
              />
            )}
            {/* https://www.ampproject.org/docs/fundamentals/optimize_amp#optimize-the-amp-runtime-loading */}
            <link
              rel="preload"
              as="script"
              href="https://cdn.ampproject.org/v0.js"
            />
            {/* Add custom styles before AMP styles to prevent accidental overrides */}
            {styles && (
              <style
                amp-custom=""
                dangerouslySetInnerHTML={{
                  __html: curStyles
                    .map(style => style.props.dangerouslySetInnerHTML.__html)
                    .join('')
                    .replace(/\/\*# sourceMappingURL=.*\*\//g, '')
                    .replace(/\/\*@ sourceURL=.*?\*\//g, ''),
                }}
              />
            )}
            <style
              amp-boilerplate=""
              dangerouslySetInnerHTML={{
                __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`,
              }}
            />
            <noscript>
              <style
                amp-boilerplate=""
                dangerouslySetInnerHTML={{
                  __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`,
                }}
              />
            </noscript>
            <script async src="https://cdn.ampproject.org/v0.js" />
          </>
        )}
        {!inAmpMode && (
          <>
            {!hasAmphtmlRel && hybridAmp && (
              <link
                rel="amphtml"
                href={canonicalBase + getAmpPath(ampPath, dangerousAsPath)}
              />
            )}
            {this.getCssLinks()}
            {this.context._documentProps.isDevelopment &&
              this.context._documentProps.hasCssMode && (
                // this element is used to mount development styles so the
                // ordering matches production
                // (by default, style-loader injects at the bottom of <head />)
                <noscript id="__next_css__DO_NOT_USE__" />
              )}
            {styles || null}
          </>
        )}
        {React.createElement(React.Fragment, {}, ...(headTags || []))}
      </head>
    )
  }
}
