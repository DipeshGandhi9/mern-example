const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log(`MongoDB connection estrablished successfully!! `);
});



const usersRouter = require('./routes/users');
const exerciesRouter = require('./routes/exercise');

app.use('/', express.static('../build'));

app.use('/api/users', usersRouter);
app.use('/api/exercises', exerciesRouter);




app.listen(port ,  () => {
    console.log(`Server is running on port : ${port}`);
});
