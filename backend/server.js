const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(cors());

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
