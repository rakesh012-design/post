require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const {Server}=require('socket.io')
const http=require('http')
const path=require('path')

const connectToMongoDb=require('./data/db')
const socketManager=require('./util/socketManager')
const errorController=require('./controllers/error-controller')

const app=express()
const server=http.createServer(app)

const dirName=path.resolve()



const io=socketManager.init(server,{
  cors:{
    origin:['http://localhost:5173', 'http://localhost:4173'],
    credentials:true
  },
})


const userRouter=require('./Routes/user-router')
const imageRouter=require('./Routes/image-router')
const postRouter=require('./Routes/postRouter')
const messageRouter=require('./Routes/message-router')



app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:5173','http://localhost:4173','http://localhost:3000'],
  credentials:true
}))


io.on('connection',(socket)=>{
  socket.on('userLogged',(user)=>{
    console.log('user has been logged in',user.userName)
  })
})



app.use('/api/random',userRouter)
app.use('/api/random/image',imageRouter)
app.use('/api/random/post',postRouter)
app.use('/api/random/message',messageRouter)

if(process.env.NODE_ENV==='production'){
  const frontendDistPath = path.resolve(dirName, '..', 'Front-end-React', 'dist');
  app.use(express.static(frontendDistPath))
  console.log('path from ???',frontendDistPath)
  app.get('*path',(req,res)=>{
    console.log('path from sendFile',path.join(frontendDistPath, 'index.html'))
    res.sendFile(path.join(frontendDistPath, 'index.html'))
  })
}

app.use(errorController)


const PORT=process.env.PORT

const startServer=async()=>{
  await connectToMongoDb()
  server.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
  })
}
startServer()


