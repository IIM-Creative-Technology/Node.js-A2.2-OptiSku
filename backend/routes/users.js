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

export default router.get('/', (req,res) => {
    User.find({}).then(function (users) {
    res.send(users);
    });
})

router.post('/', (req,res) => {
    const user = new User()
    user.name = "Clément"
    user.mail = "Clément@free.fr"
    user.password = "1234"
    user.save()
    res.send(user)
})