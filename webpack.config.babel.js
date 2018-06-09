import path from "path";
import fs from "fs";
import toml from "toml";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
// import WorkboxPlugin from "workbox-webpack-plugin";
// import OfflinePlugin from "offline-plugin";

import ManifestPlugin from "webpack-manifest-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import WebpackPwaManifest from "webpack-pwa-manifest";
import CleanWebpackPlugin from "clean-webpack-plugin";

const mode = process.env.NODE_ENV || 'development';
const isDevMode = mode !== "production";
const configFile = toml.parse(fs.readFileSync("./config.toml", "utf-8"));
const manifest = configFile.manifest;
const cleaning = isDevMode ? ["static/*.*"] : ["public/*.*", "static/*.*"];

module.exports = (env, argv) => {
  return {
    mode: mode,
    watchOptions: {
      ignored: ["/node_modules/"]
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
      }
    },
    entry: {
      main: "./src/index.js",
    },
    output: {
      filename: !isDevMode ? "[name].bundle.js" : "[name].[hash].bundle.js",
      chunkFilename: !isDevMode ? "[name].bundle.js" : "[name].[hash].bundle.js",
      path: path.resolve(__dirname, "static")
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: true,
            minimize: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            sourceMap: true,
            minimize: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
      ]
    },
    plugins: [
      new UglifyJsPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          warning: false,
          compress: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: !isDevMode ? "[name].bundle.css" : "[name].[hash].bundle.css",
        chunkFilename: !isDevMode ? "[id].bundle.css" : "[id].[hash].bundle.css"
      }),
      // new WorkboxPlugin.InjectManifest({
      //   swSrc: "./src/sw.js",
      //   swDest: "sw.js"
      // }),
      new ManifestPlugin({
        fileName: "../data/manifest.json",
      }),
      new CompressionPlugin({
        test: /\.(js|css)/,
        algorithm: "gzip",
        threshold: 0,
        minRatio: 0.8,
        cache: true,
        asset: "[path].gz[query]"
      }),
      new CopyWebpackPlugin([{
        from: "./src/images/",
        to: "images/"
      }]),
      new WebpackPwaManifest({
        filename: "manifest.json",
        orientation: "portrait",
        display: "standalone",
        start_url: ".",
        inject: true,
        fingerprints: true,
        ios: true,
        publicPath: null,
        includeDirectory: true,
        theme_color: manifest.theme_color,
        name: manifest.name,
        short_name: manifest.short_name,
        description: manifest.description,
        background_color: manifest.background_color,
        icons: [{
          src: path.resolve(manifest.iconsSrc),
          sizes: [96, 128, 192, 256, 384, 512],
        },
        {
          src: path.resolve(manifest.iconsSrc),
          sizes: "1024x1024"
        }]
      }),
      new CleanWebpackPlugin(cleaning, {watch: true, beforeEmit: true})
    //   new OfflinePlugin({
    //     appShell: "/",
    //     caches: {
    //       main: [":rest:"],
    //       additional: [":external:"],
    //       optional: ["*.bundle.js"]
    //     },
    //     externals: [
    //       ""
    //     ]
    //   })
    ]
  };
};
