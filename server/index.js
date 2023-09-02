const express = require('express')

const PORT = process.env.PORT || 3001
app = express();

// Init database
(async ()=>{
    const database = require('./db')

    await database.sync()
})();

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})