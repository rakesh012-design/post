let io;

module.exports={
  init:(httpServer,options)=>{
    const {Server} =require('socket.io')
    io =new Server(httpServer,options)
    return io
  },
  getIo:()=>{
    if(!io){
      throw new Error('Socket.io is not initialized')
    }
    return io
  }
}