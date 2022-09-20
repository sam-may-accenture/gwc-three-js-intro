import path from "path";
import { Configuration } from "webpack";

export default {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [],
  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: ["ts-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
} as Configuration;
