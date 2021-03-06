var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var copy = require('quickly-copy-file');
var del = require('del');
var argv = require('yargs').argv;
var path = require('path');

//环境
//默认端口号
var env = argv.env || 'development';
var port = '8080';  

// 开发环境
var isDev = function() {
  return env.trim() === 'development';
};

// 生产环境
var isProd = function() {
  return env.trim() === 'production';
};
if(isDev){
  port = argv.port;
}
copyAndDelFiles();

module.exports = {
  devtool: isProd() ? false : 'inline-source-map',
  entry: {
    index: isProd() ? ['./src/js/index.js'] : [
        './src/js/index.js',
        'webpack-dev-server/client?http://localhost:'+port+'/',
        'webpack/hot/only-dev-server'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      'redux-thunk',
      'nprogress'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: isProd() ? './js/[name].[chunkhash:8].js' : './js/[name].js',
    chunkFilename: isProd() ? './js/[name].chunk.[chunkhash:8].js' : './js/[name].chunk.js',
    publicPath: isProd() ? '' : '/dist/'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallback : 'style-loader', 
        use: 'css-loader',
        publicPath: '../'    /**主要是和图片导出的路径匹配 */
      })
    }, {
      // test: /\.(png|jpg)$/,
      // loader: 'file-loader?name=/[name].[hash:8].[ext]'
      test  : /\.(png|jpg|jpeg|ico|gif|woff|woff2|ttf|eot|svg)$/,
      loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  },
  plugins: getPlugins()
};

// 复制和删除文件
function copyAndDelFiles() {
  var copyFile = '';

  // 复制文件
  if (isDev()) {
    copyFile = 'src/html/index_dev.html';
  } 

  if (isProd()) {
    // copyFile = 'src/html/index.html';
    copyFile = 'src/html/index_dev.html';
  }

  copy(copyFile, 'index.html', function(error) {
    if (error) {
      return console.error(error);
    }
  });

  if (isProd()) {
    del(['dist']);
  }
}

// 获取配置
function getPlugins() {
  var plugins = [
    new webpack.DefinePlugin({
      __DEV__ : isDev(),
      __PROD__: isProd(),
      'process.env.NODE_ENV': JSON.stringify(env.trim())
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name : 'vendor', 
      filename : isProd() ? './js/vendor.[chunkhash:8].js' : './js/vendor.js'
    }),
    new ExtractTextPlugin(isProd() ? './css/[name].[chunkhash:8].css' : './css/[name].css'),
    new webpack.NoEmitOnErrorsPlugin()
  ];

  if (isDev()) {
    plugins.push(
      new OpenBrowserPlugin({ url: 'http://localhost:'+port })
    );
  }

  if (isProd()) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        title: 'cobish - 写给未来的自己',
        filename: './index.html',
        template: './src/html/index.html'
      }),
      new WebpackMd5Hash(),
      new CopyWebpackPlugin( [{ 
          from: './favicon.ico', to: '' 
      }])
    );
  }

  return plugins
}