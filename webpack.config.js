const path = require('path')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    mode: mode,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ['style-loader','css-loader', 'sass-loader'],
            },
            {
                test: /\.doubledot$/i,
                use: ['doubledot-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolveLoader: {
        alias: {
          'doubledot-loader': path.resolve(__dirname, 'src/doubledot-loader.js'),
        },
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 2000
    }
}