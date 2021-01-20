const path = require('path');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');

const loader = require.resolve('./loader');

module.exports = function runWebpack({ fixture = 'basic.js', options, extend = {} } = {}) {
  const config = {
    mode: 'none',
    entry: path.join(__dirname, '..', 'fixtures', fixture),
    output: {
      path: path.join(__dirname, '..', 'fixtures', 'dist'),
      devtoolModuleFilenameTemplate: '[resource-path]',
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
      }, {
        test: /\.js$/,
        loader,
        enforce: 'post',
        options,
      }],
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
    },
    ...extend,
  };

  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    const filesystem = new MemoryFileSystem();
    compiler.outputFileSystem = filesystem;
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      return resolve({ stats, filesystem });
    });
  });
};
