import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server } from "socket.io"
import mongoose, { Schema } from 'mongoose'
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://127.0.0.1:27017/test");

const userSchema = {
  name: String,
  mail: String,
  password: String,
}

const User = mongoose.model('User' , userSchema)
const UserPlay = mongoose.model('UserPlay' , userSchema)


const app = express();
app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})


const router = express.Router()
let currentFName = ""
let currentLName = ""
let currentEmail = ""

export default router.get('/', (req,res) => {
//     res.json({
//         firstName: currentFName,
//         lastName: currentLName,
//         email: currentEmail
//     })
// })

// router.post('/', (req,res) => {
//     // console.log(req.body.firstName)
//     currentFName = req.body.firstName
//     currentLName = req.body.lastName
//     currentEmail = req.body.email
//     res.json({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email
//     })
    User.find({}).then(function (users) {
    res.send(users);
    });
})

router.get('/:name/:password', (req,res) => {
    User.find({ name:req.params.name ,password:req.params.password}).then(function(users){
    res.send(users);
  })  
})

router.post('/', (req,res) => {
    const user = new User()
    user.name = "Clement"
    user.mail = "Clement@free.fr"
    user.password = "1234"
    user.save()
    res.send(user)
})
router.post('/play/:_id', (req,res) => {
  User.find({_id:req.params._id}).then(function (users) {
    const user = new UserPlay()
    user.name = users.name
    user.mail = "Clement@free.fr"
    user.password = "1234"
    user.save()
    res.send(user)
  });
})