const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');

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

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Server is running on port ${port}`));
