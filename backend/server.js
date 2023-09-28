const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const collectionRoutes = require('../backend/routes/collectionRoute');
const photoRoutes = require('./routes/photoRoutes');

app.use('/api', collectionRoutes);
app.use('/api', photoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
