const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext, path) =>
    isDev
        ? `${path ? path + "/" : ""}bundle.${ext}`
        : `${path ? path + "/" : ""}bundle.[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, "src"),

    mode: "development",

    entry: ["./index.js"],

    output: {
        filename: filename("js", "js"),
        publicPath: isProd ? "./" : "/",
        path: path.resolve(__dirname, "dist"),
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/i,
                use: ["babel-loader"],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin({
            template: "index.html",
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "favicon.ico"),
                    to: path.resolve(__dirname, "dist"),
                },
                {
                    from: path.resolve(__dirname, "src", "fx.svg"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),

        new MiniCssExtractPlugin({
            filename: filename("css", "styles"),
        }),

        new ESLintPlugin({ fix: isDev }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@styles": path.resolve(__dirname, "src", "scss"),
            "@core": path.resolve(__dirname, "src", "core"),
            "@store": path.resolve(__dirname, "src", "core", "store"),
            "@redux": path.resolve(__dirname, "src", "redux"),
            "@components": path.resolve(__dirname, "src", "components"),
        },
    },

    devtool: isDev ? "source-map" : false,

    devServer: {
        port: 3000,
        hot: isDev,
        open: false,
        historyApiFallback: true,
    },
};
