const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task')

const PORT = process.env.PORT || 3001
app = express();

app.use(bodyParser.json());

// Init database
(async ()=>{
    const database = require('./db')

    const User = require('./models/User')
    const Task = require('./models/Task')

    await database.sync()
})();

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);


app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})