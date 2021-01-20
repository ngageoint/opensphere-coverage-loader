const { createInstrumenter } = require('istanbul-lib-instrument');
const loaderUtils = require('loader-utils');
const { validate } = require('schema-utils');
const convert = require('convert-source-map');
const schema = require('./options');

module.exports = function instrument(source, sourceMap) {
  const options = loaderUtils.getOptions(this);

  validate(schema, options, {
    name: 'Istanbul Instrumenter Loader',
    baseDataPath: 'options',
  });

  let srcMap = sourceMap;

  // use inline source map, if any
  if (!srcMap) {
    const inlineSourceMap = convert.fromSource(source);
    if (inlineSourceMap) {
      srcMap = inlineSourceMap.sourcemap;
    }
  }

  // Babel requires source map to be boolean, Object, or undefined (not null)
  srcMap = srcMap !== null ? srcMap : undefined;

  const instrumenter = createInstrumenter(options);
  instrumenter.instrument(source, this.resourcePath, (error, instrumentedSource) => {
    this.callback(error, instrumentedSource, instrumenter.lastSourceMap());
  }, srcMap);
};
