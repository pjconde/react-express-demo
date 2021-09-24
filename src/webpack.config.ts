import * as path from 'path';
import * as webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, 'app', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // devServer: {
    //     historyApiFallback: true
    // },
    module: {
        rules: [{
            test: /\.tsx?/,
            loader: 'babel-loader'
        }]
    }
};
  
export default config;