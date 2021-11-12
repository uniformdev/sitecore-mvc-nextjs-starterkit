module.exports = {
  context: __dirname,
  target: "webworker",
  entry: {
    worker: './worker.js'
  },
  mode: "production",
  optimization: {
    usedExports: true,
  },
  node: {
      // global: false,
      // __filename: false,
      // __dirname: false,
      fs: "empty",
      net: "empty",
      tls: "empty",
  },
}
