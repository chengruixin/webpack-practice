const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: '/', // is only webpacked js file
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'static'),
        publicPath: '/assets', // this is for all static resources prefix
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              esModule: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
