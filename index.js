require('dotenv').config();
const cookieSession = require('cookie-session')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys:['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use('/users', require('./routes/userRoutes'))
app.use('/customers', require('./routes/cusomerRoutes'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})




