const express = require('express')
const jwt = require('jsonwebtoken');
const validateToken = require('../middlewares/tokenValidation');
const Task = require('../models/Task');

const router = express.Router()

router.get('/tasks', validateToken, async (req, res, next)=>{
    const authorId = req.userInfo.id

    const tasks = await Task.findAll({
        where: {
            authorId: authorId
        }
    })

    res.status(200).json(tasks)
})

router.post('/task', validateToken, async (req, res, next)=>{
    const authorId = req.userInfo.id
    const { title, description } = req.body
    
    try{
        const task = await Task.create({
            title: title,
            description: description,
            authorId: authorId
        })
        console.log(task)
        res.status(200).json(task)
    }catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Something went wrong!'
        })
    }
    
})

router.delete('/task/:id', validateToken, async (req, res, next)=>{
    const { id } = req.params

    if (!id) {
        res.status(400).json({
            message: 'Bad request'
        })
    }

    const task = await Task.findByPk(id)
    if (!task){
        res.status(400).json({
            message: 'Task not found'
        })
    }else{
        try{
            const count = Task.destroy({where: {
                id: id
            }})
            res.status(200).json(count)
        }catch{
            res.status(500).json({
                message: 'Something went wrong'
            })
        }
    }

    
})

module.exports = router