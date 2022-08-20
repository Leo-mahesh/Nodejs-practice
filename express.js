// Restful api's using express

const express = require('express')
const Joi = require('joi')
const helmet = require("helmet")
const morgan = require('morgan')
const config = require('config')
const appDebugger= require('debug')("app:startup")
const dbDebugger = require('debug')("app:db")

const middleware = require('./middleware')

const app = express()

app.use(express.json())
app.use(helmet())


console.log(`Name : ${config.get("name")} Pass: ${config.get("password")}`)

// Environment Variables
// process.env.NODE_ENV always return undefined if not set
// app.get("env") return development if not set

// how to set env Variables ?
// mac => export NODE_ENV = "development" || "production"
// windows => set NODE_ENV = "development" || "production"

// Debugger using envs
// export DEBUG=app:*   => for all namespaces
// export DEBUG=app:startup || export DEBUG=app:db

// Shortcut DEBUG=app:startup nodemon express.js 
dbDebugger("Testing DB ......")

if(app.get("env") == "development"){

    // Morgan impacts request processing pipeline so only use it in development
    app.use(morgan("tiny"))

    appDebugger("Runnind code in development mode")
}



// Middleware for accessing static files from public folder
// ex localhost:3000/static.png

app.use(express.static("public"))


// Creating Custom Middleware
app.use(middleware)


const port = process.env.PORT || 3000


const users = [
    {
        id:1,
        name:"demo"
    },
    {
        id:2,
        name:"user"
    }
]


const validate = (user) => {

    const schema = Joi.object( {
        name:Joi.string().min(3).required()
    })

    return schema.validate(user)



}

app.get("/",(req,res) => {
    res.send("Express server created with route")
})

app.get("/api/users" , (req, res) => {
    res.send(users)
})

// app.get("/api/users/:id", (req, res) => {
//     res.send( req.query)
// })

// get single user

// app.get("/api/users/:id", (req, res) => {

//     const userData = users.find((d) => d.id === parseInt(req.params.id))

//     userData ? res.send(userData) : res.status(404).send("User with given id not found")

// })


// post api for adding users

app.post("/api/users", (req, res) => {

   const {error} = validate(req.body)

    if(error) {
        res.status(404).send(error.details[0].message)
        return
    }

    const addUser = {
        id : users.length + 1,
        name: req.body.name,
    }
    users.push(addUser)
    res.send(users)
})

// Put request

app.put('/api/users/:id',(req,res) => {

    const userData = users.find((d) => d.id === parseInt(req.params.id))


    if(!userData){
        res.status(404).send("User with given id not found")
        return
    }


    const {error} = validate(req.body)

    if(error) {
        res.status(404).send(error.details[0].message)
        return
    }

    userData.name = req.body.name

    res.send(userData)


})

app.delete("/api/users/:id",(req, res) => {
    const userData = users.find((d) => d.id === parseInt(req.params.id))
    if(!userData){
        res.status(404).send("User with given id not found")
        return
    }


    const index = users.indexOf(userData)

    users.splice(index, 1)

    res.status(200).send("User with given id was deleted")


})

app.listen(port,() => {
    console.log(`Express server listening on port ${port}`)
})