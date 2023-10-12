/* eslint-env node */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(cors());
app.use('/api/uploads/photos', express.static(path.join(__dirname, 'uploads/photos')));

const collectionRoutes = require('./routes/collectionRoute');
app.use('/api', collectionRoutes);

const startServer = () => {
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
