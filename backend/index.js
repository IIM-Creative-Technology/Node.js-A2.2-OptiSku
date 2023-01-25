import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server } from "socket.io"

// import router from "./routes/users"

const app = express();
app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    // console.log(msg.msg)
    io.emit('serv message', msg.msg);
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

server.listen(port, () => {
    console.log('Example app listening on port 3000')
})