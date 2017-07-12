import bodyParser from "body-parser";
import {config} from "../config";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import path from "path";
import spdy from 'spdy';
import fs from "fs";
import noTokenRoutes from "./routes/noTokenRoutes";
//import tokenRoutes from "./routes/tokenRoutes";

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.static(`${path.resolve(process.cwd())}/build`));

mongoose.Promise = global.Promise;

mongoose.connect(
  config.database(process.env.USERDB, process.env.PASSWDDB),
  { server: { poolSize: 4 }}
);
let db = mongoose.connection;
  db.once('connected', function() {
  console.log('DB Connected');
});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev')); // use env: process.env.ENV=dev


app.use(function(req, res, next) {
  const origin = req.headers[ 'origin' ];
  res.set("Access-Control-Allow-Origin", origin);
  res.set("Access-Control-Allow-Headers", "X-Requested-With,content-type,contenttype,crossdomain,Timezone-Offset,Sample-Source");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.set("Access-Control-Max-Age", `${60 * 4}`);
  res.set('Content-Type', 'application/json');
  next();
});


const serverOpts = {
  key: fs.readFileSync(`${path.resolve(process.cwd())}/key/server.key`),
  cert: fs.readFileSync(`${path.resolve(process.cwd())}/key/server.crt`)
};

noTokenRoutes(app);

spdy.createServer(serverOpts, app).listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Listen server https://localhost:${PORT}`);
});
