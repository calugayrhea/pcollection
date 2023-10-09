const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT for Heroku or other hosting platforms

app.use(bodyParser.json());
app.use(cors());

const collectionRoutes = require('./routes/collectionRoute');
app.use('/api', collectionRoutes);

// Define the server start function
const startServer = () => {
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// If this file is the main module, start the server
if (require.main === module) {
  startServer();
}

// Export the app and startServer function for testing
module.exports = { app, startServer };
