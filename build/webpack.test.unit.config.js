module.exports = {
  entry: '../test/unit/specs/index.js',
  output: {
    path: '../test/unit',
    filename: 'specs.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loader: 'babel',
        query: {
            presets: ['es2015', 'stage-1']
        }
      }
    ]
  }
}
