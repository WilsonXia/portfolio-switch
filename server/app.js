require('dotenv').config();
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');
// REDIS -----------------------------------
const RedisStore = require('connect-redis').default;
const redis = require('redis');
//
const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/portfolio';
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

// REDIS -----------------------------------
const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
  // Must finish everything after connecting to Redis
  // Using a promise
  const app = express();
  // Source - https://stackoverflow.com/a/72330030
  // Posted by ebed meleck
  // Retrieved 2026-03-06, License - CC BY-SA 4.0

  app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data: blob:"],
      },
    })
  );

  app.use(fileUpload({ useTempFiles: true, }
  ));
  app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
  app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    key: 'sessionid',
    // REDIS -----------------------------------
    store: new RedisStore({
      client: redisClient,
    }),
    //
    secret: 'gouGhoust', // Hashing
    resave: false,
    saveUninitialized: false,
  }));
  //
  app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
  app.set('view engine', 'handlebars');
  app.set('views', `${__dirname}/../views/`);

  router(app);

  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Listening on port ${port}`);
  });
});
