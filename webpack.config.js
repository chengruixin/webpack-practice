const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: '/', // 从 entry 定义打包的文件，到打包成 path + filename后的output，这个output被访问的前缀即为publicPath
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'static'),
        publicPath: '/prefix', // 访问 __dirname + static 的路径的前缀
      }
    ], // 静态资源文件根目录. e.g dist/show.txt will be accessed by /show.txt
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
            name: 'heelo-[hash].[ext]',
            esModule: false,
            limit: 1 * 1024
          },
        }],
        type: 'javascript/auto'
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
