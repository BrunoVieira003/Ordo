const express = require('express')
const homeRoute = require('./routes/home')
const usersRoutes = require('./routes/users')
const dashboardRoutes = require('./routes/dashboard')
const methodOverride = require('method-override')
const session = require('express-session')

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

// Forms needed configs
app.use(express.urlencoded({'extended':true}))
app.use(methodOverride('_method'))

// Session config
app.use(session({secret: "mysecretkey"}))

// Modal messages config
app.use((req, res, next)=>{
    res.locals.message = req.session.message
    res.locals.user = req.session.user
    delete req.session.message
    next()
})

// Set routes
app.use(homeRoute)
app.use(usersRoutes)
app.use(dashboardRoutes)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})