const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const collectionRoutes = require('./routes/collectionRoute'); 
app.use('/api', collectionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
