# OpenSphere Code Coverage Loader

Instrument JS files with [istanbul-lib-instrument](https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-lib-instrument) for subsequent code coverage reporting.

This project is forked from [istanbul-instrumenter-loader](https://github.com/webpack-contrib/istanbul-instrumenter-loader) to provide additional maintenance in support of [OpenSphere](https://github.com/ngageoint/opensphere).

## Install

```bash
npm i -D istanbul-instrumenter-loader
```

## Usage

Add the loader to the webpack config:

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: '@ngageoint/opensphere-coverage-loader',
        options: {esModules: true}
      },
      include: path.resolve('src')
    }
  ]
}
```

Then configure [karma-coverage-istanbul-reporter](https://github.com/mattlewis92/karma-coverage-istanbul-reporter) as your test coverage reporter.

## Options

The loader supports all options supported by `istanbul-lib-instrument`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`debug`**|`{Boolean}`|`false`|Turn on debugging mode|
|**`compact`**|`{Boolean}`|`true`|Generate compact code|
|**`autoWrap`**|`{Boolean}`|`false`|Set to `true` to allow return statements outside of functions|
|**`esModules`**|`{Boolean}`|`false`|Set to `true` to instrument ES2015 Modules|
|**`coverageVariable`**|`{String}`|`__coverage__`|Name of global coverage variable|
|**`preserveComments`**|`{Boolean}`|`false`|Preserve comments in `output`|
|**`produceSourceMap`**|`{Boolean}`|`false`|Set to `true` to produce a source map for the instrumented code|
|**`sourceMapUrlCallback`**|`{Function}`|`null`|A callback function that is called when a source map URL is found in the original code. This function is called with the source filename and the source map URL|
