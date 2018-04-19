const path = require('path')

module.exports = {
  mode: "development",
  watch: true,
  entry: "./src/public/index.tsx",
  output: {
    filename: "./index.js",
    path: path.resolve(__dirname, 'public')
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // Handle .ts and .tsx file via ts-loader.
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}
