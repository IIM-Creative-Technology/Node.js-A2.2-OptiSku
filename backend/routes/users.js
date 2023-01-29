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

// Recupere tou les utilisateurs
export default router.get('/', (req,res) => {

    User.find({}).then(function (users) {
        res.send(users);
    });
})

let isConnected = 0
// Login avec nom + mdp dans l'url
router.post('/:name/:password', (req,res) => {
    User.find({ name:req.params.name ,password:req.params.password}).then(function(users){
        res.send(users);
    })
})

// Login
router.post('/login', (req,res) => {
  User.find({ name:req.body.nameSignUp ,password:req.body.passwordSignUp}).then(function(users){
    isConnected = 1
    res.send(users);
  })
})

// Log out
router.get('/logout', (req,res) => {
  res.json({connection:isConnected})
  isConnected = 0
})

// Creer un nouveau utilisateur
router.post('/', (req,res) => {
    const user = new User()
    user.name = req.body.firstName
    user.mail = req.body.email
    user.password = req.body.password
    user.save()
    res.send(user)
    res.json({
        firstName: req.body.firstName,
        lastName: req.body.password,
        email: req.body.email
    }) 
})

// Pour le jeu
router.post('/play/:_id', (req,res) => {
  User.find({_id:req.params._id}).then(function (users) {
    const user = new UserPlay()
    user.name = users.name
    user.mail = "Clement@free.fr"
    user.password = "1234"
    user.save()
    res.send(user)
  })
})

// Delete
router.delete('/', (req,res) => {
  console.log(req.body.id)
  isConnected = 1
  User.findOneAndDelete({_id:req.body.id}).then(function (){
    res.json({
      msg: 'Got a DELETE request at /',
      connection: isConnected
    })
  })
})