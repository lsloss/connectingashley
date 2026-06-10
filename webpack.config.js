const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',

        entry: './assets/js/app.js', // SCSS is imported inside this file

        output: {
            filename: 'js/app.min.js',
            path: path.resolve(__dirname, 'assets/dist'),
            clean: true
        },

        devtool: isProduction ? false : 'source-map',

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(scss|sass|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [require('autoprefixer')]
                                }
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    type: 'asset/source'
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/app.min.css'
            }),

            ...(!isProduction
                ? [
                    new BrowserSyncPlugin(
                        {
                            proxy: 'http://ashley.test',
                            files: [
                                '**/*.php',
                                'assets/dist/css/*.css',
                                'assets/dist/js/*.js'
                            ],
                            notify: false,
                            open: false
                        },
                        { reload: false }
                    )
                ]
                : [])
        ],

        optimization: {
            splitChunks: false
        }
    };
};