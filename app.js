const express = require('express')
const homeRoute = require('./routes/home')
const usersRoutes = require('./routes/users')

const app = express();
const port = 3000;

// Init database
(async ()=>{
    const database = require('./db')
    const User = require('./models/User')

    await database.sync()
})();

// Set views directory / engine
app.set('view engine', 'ejs');
app.set('views', './views')

// Set static files directory
app.use(express.static('public'))

// Set routes
app.use(homeRoute)
app.use(usersRoutes)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})