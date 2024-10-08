const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const staffRouter = require('./controllers/staff.js');
const studentRouter = require('./controllers/students.js')
const logRouter = require('./controllers/log.js')
const commentsRouter = require('./controllers/comments.js');

const PORT = process.env.PORT ? process.env.PORT : 3000

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Routes go here
app.use('/users', usersRouter);
app.use('/staff', staffRouter);
app.use('/students', studentRouter) //localhost:3000/students
app.use('/logs', logRouter)
app.use('/logs', commentsRouter);

app.listen(PORT, () => {
    console.log('The express app is ready!');
});