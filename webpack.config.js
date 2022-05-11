const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: '/', // 从 entry 定义打包的文件，到打包成 path + filename后的output，这个output被访问的前缀即为publicPath
  },
  devServer: {
    static: [  // 静态资源文件根目录
      {
        directory: path.resolve(__dirname, 'static'),
        publicPath: '/prefix', // 访问 __dirname + static 的路径的前缀
      }
    ],
    compress: true, // 是否启动压缩
    port: 3691,
    open: true, // 自动打开浏览器
    devMiddleware: {
      writeToDisk: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: false }]
            ]
          }
        }]
      },
      {
        test: /\.txt$/,
        use: path.resolve(__dirname, 'loaders', 'rawLoader.js')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[hash:10].[ext]',
            esModule: false,
            limit: 16 * 1024
          },
        }],
        type: 'javascript/auto'
      }
    ]
  },

  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts', 'jsx', 'tsx'],
      // fix: true,
      failOnError: true,
      failOnWarning: false,
      files: './src'
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
