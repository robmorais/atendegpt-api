const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
require('dotenv').config();

const sitebotController = require('./controllers/sitebotController');
const db = require('./db/mongo');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Create a logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// SiteBot routes
app.post('/sitebot', sitebotController.createSiteBot);
app.get('/sitebot/:token', sitebotController.getSiteBot);

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

db.connect(url, dbName)
  .then(() => {
    app.listen(port, () => logger.info(`Server is running on port ${port}`));
  })
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB: ${err}`);
    process.exit(1);
  });

// app.listen(port, () => logger.info(`Server is running on port ${port}`));
