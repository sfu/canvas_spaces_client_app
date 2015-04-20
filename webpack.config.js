const webpack = require('webpack');
const path = require('path');

var pragmas = new webpack.DefinePlugin({
  __DEV__: 'true'
});

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/js/index.js',
  ],

  output: {
    filename: 'canvas_spaces.js',
    path: './dist',
    publicPath: 'http://localhost:8080/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  },

  plugins: [
    pragmas,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: __dirname + '/src/js',
    alias: {
      'FormComponents': __dirname + '/src/js/FormComponents'
    }
  },

  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/v1/*': 'http://canvas.dev'
    }
  }
}
