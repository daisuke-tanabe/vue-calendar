const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const entry = {
  'index.js': './index.js',
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    port: '8080',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: {
              loader: 'css-loader',
            },
            scss: {
              loader: 'sass-loader',
            },
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};
