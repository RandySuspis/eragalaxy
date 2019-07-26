const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const ImageminPlugin = require("imagemin-webpack");

// Before importing imagemin plugin make sure you add it in `package.json` (`dependencies`) and install
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");

module.exports = (env, argv) => {
    console.log(argv.mode)        // outputs development
    console.log(argv.devServer)        // outputs development
    var devMode = argv.mode !== 'production';
    var publicPathFileLoader = "/";
    var publicPathBundleJS = "/";
    if (argv.devServer === 'yes') {
        publicPathFileLoader = "http://localhost:8080/1Assets/";
        publicPathBundleJS = "http://localhost:8080/";
    }else{
        var publicPathFileLoader = devMode ? '/dev' :'/dist';
        var publicPathBundleJS = devMode ? '/dev' :'/dist';
    }

    var endingFolder = devMode ? '_endResult/dev' :'_endResult/dist';
    var rootOutputFile = path.resolve(__dirname, endingFolder);

    if (true){
        endingFolder = devMode ? '../public/dev' :'../public/dist';
        rootOutputFile = path.resolve(__dirname, endingFolder);
    }


    return {
        mode:devMode?'development':'production',
        entry: {
            frontend: "./2App/frontend.jsx",
            frontendApp: "./2App/frontendApp.jsx",
            backend: "./2App/backend.jsx",
        },
        output: {
            filename: '[name].js',
            path: rootOutputFile,
            publicPath: publicPathBundleJS
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader", options: {
                                sourceMap: devMode ? true : false
                            }
                        },
                        {
                            loader: "sass-loader", options: {
                                sourceMap: devMode ? true : false
                            }
                        }]
                },
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    include: [
                        path.resolve(__dirname, '1Assets/img'),
                        path.resolve(__dirname, '0Template')
                    ],
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert img < 8kb to base64 strings
                            name: '[path][name].[ext]',
                            // After Build where will they Put
                            outputPath: '/',
                            publicPath: publicPathFileLoader,
                            emitFile: true,
                            context:'1Assets'
                        }
                    }]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    include: [path.resolve(__dirname, '1Assets/fonts')],
                    use: [{
                        loader: 'url-loader',
                        options: {
                            name: './[path][name].[ext]',
                            outputPath: '/',
                            publicPath: publicPathFileLoader,
                            emitFile: true,
                            context:'1Assets'
                        }
                    }]
                }
            ]
        },
        plugins: [
            new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(devMode?'development':'production')
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].css',
                chunkFilename: devMode ? '[name].css' : '[name].css',
                path: path.resolve(__dirname, '_endResult')
            }),
            new ImageminPlugin({
                bail: false, // Ignore errors on corrupted images
                cache: true,
                imageminOptions: {
                    // Lossless optimization with custom option
                    // Feel free to experement with options for better result for you
                    plugins: [
                        imageminGifsicle({
                            interlaced: true
                        }),
                        imageminJpegtran({
                            progressive: true
                        }),
                        imageminOptipng({
                            optimizationLevel: 5
                        }),
                        imageminSvgo({
                            removeViewBox: true
                        })
                    ]
                }
            }),
        ],
        optimization: {
            nodeEnv: false,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: devMode?true:false, // Must be set to true if using source-maps in production
                    terserOptions: {
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    }
                }),
                new OptimizeCssAssetsPlugin({})
            ],
            minimize: devMode?false:true,
            splitChunks: {
                chunks: 'all',
                name:'vendors'
            }
        },
        resolve: {
            alias: {
                "~": path.resolve(__dirname, ''),
                "~Components": path.resolve(__dirname, '0Template/Components'),
                "~Module": path.resolve(__dirname, '0Template/Module'),
                "~Assets": path.resolve(__dirname, '1Assets')
            }
        },
        node: { fs: 'empty' },
        devtool: 'source-map'
    }
}
