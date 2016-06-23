module.exports = {
  entry: '../src/index.js',
  module: {
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules\//,
          loader: 'babel',
          query: {
              // plugins: ['transform-runtime',"transform-async-to-generator"],
              // plugins: ["syntax-async-functions"],
              presets: ['es2015', 'stage-0']
          }
      }
    ]
  },
}
