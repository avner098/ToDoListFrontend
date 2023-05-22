require('dotenv').config()
const express = require('express')
const taskRoutes = require('./routes/tasks')
const mongoose = require('mongoose')
const userRoutes =require('./routes/user')
//express app
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/tasks', taskRoutes)
app.use('/user',userRoutes)
//coonect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listen on port 4000')
        })
    })
    .catch((err) => {
        console.log(err)
    })

