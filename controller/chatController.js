const goChatPage=(req,res)=>{
    res.render("chatMessages.pug")
}


const chatOperation = (socket) =>{
    socket.on("userMessage", (info)=>{
        socket.emit("showMessage",info)
    })
}


module.exports = {goChatPage,chatOperation}