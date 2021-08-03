const mongoose = require("mongoose");
const Document =require('./Document');
mongoose.connect('mongodb://localhost/realtime-collab', {
     useNewUrlParser: true,
     useUnifiedTopology: true
    });



const io=require('socket.io')(3001,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",socket =>{

    socket.on('get-document',async documentId=>{
        const document=await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document',document.data);

        socket.on('send-changes', delta=>{
            console.log(delta);
            socket.broadcast.to(documentId).emit('recieve-changes',delta);
        })

        socket.on('save-document', async data =>{
            await Document.findByIdAndUpdate(documentId, {data});
        })
    })    
    socket.on('recieve-changes',delta=>{

    })
    console.log("connected")
})

const defaultValue="Feed me with your thoughts";
async function findOrCreateDocument(id){
    if(id==null)
        return;
    const document =await Document.findById(id);
    if(document) return document;

    return await Document.create({ _id:id,data:defaultValue})
}