// Requiring Plugins
const { env } = require("process");
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin");

module.exports = {
  mode: env.prod ? "production" : "development",
  entry: {
    main: path.resolve(__dirname, "src", "main.ts"),
    homepage: path.resolve(__dirname, "src", "styles", "pages", "homepage.css"),
    register: path.resolve(
      __dirname,
      "src",
      "features",
      "authentication",
      "register",
      "register.ts"
    ),
    signIn: path.resolve(
      __dirname,
      "src",
      "features",
      "authentication",
      "sign-in",
      "sign-in.ts"
    ),
  },
  output: {
    filename: "scripts/[name]_[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[name]_[hash][ext]",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // Optimization in the build process
  optimization: {
    minimize: env.prod,
    minimizer: [
      new TerserPlugin(),
      new CSSMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  devtool: "eval-source-map",
  // Setting up dev server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3030,
    open: true,
    hot: true,
    compress: true,
    liveReload: true,
    watchFiles: {
      paths: ["src/**/*"],
    },
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: {
          loader: "html-loader",
          options: {
            sources: true,
          },
        },
      },
      {
        test: /\.ts$/i,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/i,
      },
      {
        test: /\.css$/i,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        type: "asset/resource",
        use: {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: { progressive: true, quality: 75 },
            pngquant: { quality: [0.75, 0.9], speed: 4 },
            gifsicle: { interlaced: false },
            webp: { quality: 75 },
          },
        },
      },
    ],
  },
  // Plugins
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
      meta: {
        description:
          "IQuiz is designed for both quiz makers and solvers. It offers easy and seamless management of quizzes for professional use.",
        keywords:
          "quiz, creator, generator, app, survey, surveys, quizzes, online",
        author: "Abdulrahman Ismael",
        compatible: {
          "http-equiv": "X-UA-Compatible",
          content: "IE=7",
        },
      },
      inject: "body",
      chunks: ["main", "homepage"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, "src", "pages", "register.html"),
      filename: "pages/register.html",
      meta: {
        description: "Sign up and Start your journey with IQuiz!",
        keywords:
          "quiz, creator, generator, app, survey, surveys, quizzes, online, sign up, register",
        author: "Abdulrahman Ismael",
        compatible: {
          "http-equiv": "X-UA-Compatible",
          content: "IE=7",
        },
      },
      inject: "body",
      chunks: ["main", "register"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, "src", "pages", "sign-in.html"),
      filename: "pages/sign-in.html",
      meta: {
        description: "Sign In and start making or solving Quizzes Now!",
        keywords:
          "quiz, creator, generator, app, survey, surveys, quizzes, online, sign in",
        author: "Abdulrahman Ismael",
        compatible: {
          "http-equiv": "X-UA-Compatible",
          content: "IE=7",
        },
      },
      inject: "body",
      chunks: ["main", "signIn"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCSSExtractPlugin({
      filename: "styles/[name]_[contenthash].css",
      chunkFilename: "chunks/[id]_[contenthash].css",
      insert: "head",
      runtime: true,
    }),
    new CompressionPlugin({
      test: /\.(css|js|html|png|jpg|jpeg|svg|webp|gif)$/i,
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8,
    }),
    new IgnoreEmitPlugin(/^scripts\/homepage_?.*\.js$/),
    ,
  ],
};
