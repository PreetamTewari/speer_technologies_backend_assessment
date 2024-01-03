const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const noteRoutes = require('./routes/note.route');
const {limiter} = require('./utils/helper.util')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(limiter);

app.use('/api/auth/', userRoutes)
app.use('/api/', noteRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if(process.env.NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}


module.exports = app;