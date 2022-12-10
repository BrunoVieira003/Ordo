const express = require('express')
const User = require('../models/User')
const { Op } = require("sequelize");

const router = express.Router()

router.get('/login', async (req, res, next)=>{
    res.render('users/login');
})

router.post('/login', async (req, res, next)=>{
    const {username, password} = req.body
    const user = await User.findOne({where:{
        [Op.or]: [{name: username}, {email: username}]
    }})
    if(!user){
        res.send("Usuário não encontrado! Tente novamente")
    }else if(user.password != password){
        res.send("Senha incorreta! Tente novamente")
    }else{
        req.session.user = user
        res.render('home');
    }
})

router.get('/register', (req, res, next)=>{
    res.render('users/register');
})

router.post('/register', async (req, res, next)=>{
    const {username, email, password, c_password} = req.body
    if (password != c_password) {
        res.send('As senhas não combinam! Digite novamente')
    }else{
        try {
            const user = await User.create({
                name: username,
                password: password,
                email: email
            })
            res.redirect('/login')
        } catch(error){
            if (error.name == 'SequelizeUniqueConstraintError') {
                if (error.errors[0].path == 'name') {
                    res.send('Nome de usuário já está em uso! Tente outro')
                }else{
                    res.send('Esse email já pertence a uma conta!')
                }
            }
        }
    }
    
})

module.exports = router