import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server } from "socket.io"
import mongoose, { Schema } from 'mongoose'
mongoose.set('strictQuery', true)


import userRoute from "./routes/users.js"

const app = express();
app.use(bodyParser.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/test")

const userSchema = {
  name: String,
  mail: String,
  password: String,
  isAdmin: Boolean,
  isVerified: Boolean,
  age: Number
}

const User =  mongoose.model('User', userSchema)

const angel = new User ({
  name: "Angel",
  mail: "hmaliangel11@gmail.com",
  password: "azerty",
  isAdmin: true,
  isVerified: true,
  age: 19
})

angel.save().then((data) => {
  console.log(data)
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('serv message', msg);
  });
});

const port = 3000

app.get('/', (req, res) => {
    console.log('nouvelle conexion')
    res.json({msg:'GETEEE'})
  })
  
  app.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
  })
  
  app.delete('/', (req, res) => {
    res.json({msg:'DEL'})
  })

  app.use("/api/user", userRoute);

server.listen(port, () => {
    console.log('Example app listening on port 3000')
})

