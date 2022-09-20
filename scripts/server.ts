import express from "express";
import path from "path";
import webpack from "webpack";
import webpack_middleware from "webpack-dev-middleware";
import config from "../webpack.config.dev";

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  webpack_middleware(compiler, {
    publicPath: config.output?.publicPath,
  })
);

app.get("/", (req, res) => {
  res.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';"
  );
  res.sendFile(path.join(__dirname, "../src/index.html"));
});
app.use(function (req, res, next) {
  res.status(404).send("well this is awkward");
});

app.listen(port);
