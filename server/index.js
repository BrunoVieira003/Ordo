const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const PORT = process.env.PORT || 3001
app = express();

app.use(bodyParser.json());

// Init database
(async ()=>{
    const database = require('./db')

    const User = require('./models/User')

    await database.sync()
})();

// Routes
app.use(authRoutes);
app.use(userRoutes)


app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})