module.exports = {
  entry: '../example/basic/index.js',
  output: {
    path: '../example/basic/',
    filename: 'example.js',
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
  },
  devtool: '#source-map'
}
