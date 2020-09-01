const dotenv = require("dotenv");
dotenv.config();

const { createPublishProvider } = require("@uniformdev/publishing-all");
const { parseUniformServerConfig } = require("@uniformdev/common-server");

const config = parseUniformServerConfig(process.env, console);

new createPublishProvider({
  config,
  logger: console,
}).deploy("out");
