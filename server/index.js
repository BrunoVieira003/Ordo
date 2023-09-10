const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001
app = express();

app.use(bodyParser.json());

// Init database
(async ()=>{
    const database = require('./db')

    const User = require('./models/User')

    await database.sync()
})();

const User = require('./models/User');
const { Op } = require("sequelize")

app.post('/register', async (req, res)=>{
    const {username, email, password, confirmPassword} = req.body
    const user = await User.findOne({where: {
        [Op.or]: [
            {name: username},
            {email: email},
        ],
    }})

    if (!user && password == confirmPassword){
        const newUser = await User.create({
            name: username,
            email: email,
            password: password
        })

        res.status(201).send(newUser)
    }else{
        res.status(409).send({
    
            error: {
                type: 'username-conflict'
            }
        })
    }

})

app.get('/checkname/:username', async (req, res) => {
    const { username } = req.params

    const user = await User.findOne({
        where:{
            name: username
        }
    })

    if (user){
        res.send({status: 'taken'})
    }else{
        res.send({status: 'available'})
    }
})

app.get('/checkemail/:email', async (req, res) => {
    const { email } = req.params

    const user = await User.findOne({
        where:{
            email: email
        }
    })

    if (user){
        res.send({status: 'taken'})
    }else{
        res.send({status: 'available'})
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})