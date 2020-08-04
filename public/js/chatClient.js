const sendUserInfo = () =>{
    let userName = localStorage.getItem('userName')||sessionStorage.getItem("userName")
    let imageFileName = localStorage.getItem("imageFilename")||sessionStorage.getItem("imageFilename")
    return {userName,imageFileName}
}
const socket = io()

const btn = document.getElementById('sendMessage')
const input = document.getElementById('input');
const messageBox = document.getElementById('messageBox')

btn.addEventListener("click",function(){    
    socket.emit("userMessage" , {msg:input.value , senderInfo:sendUserInfo()})
})

function chatBotMessage(msg){
    var botmessage = document.createElement("p")
    botmessage.innerText = msg
    botmessage.classList.add('botmessage')
    return botmessage
}
function addMessage(info){

    
    var newMessage = document.createElement("div")
    newMessage.classList.add('newMessage')

    var aside = document.createElement("aside")
    aside.classList.add('senderInfo')
    aside.innerHTML = `
        <img src=http://localhost:3000/image/user/${info.senderInfo.imageFileName} width=60px height=60px/>
        <p class=senderName>${info.senderInfo.userName}</p>
    `
    newMessage.appendChild(aside)

    var sectionMessage = document.createElement("section")
    newMessage.appendChild(sectionMessage)
    
    sectionMessage.innerHTML = `<p class=textMessage>${info.msg}</p>`
    return newMessage
}

socket.on("showMessage",(info)=>{
    const newMessage = addMessage(info)
    messageBox.appendChild(newMessage)
})

socket.on("userConnection",msg=>{
    let botmessage = chatBotMessage(msg)
    
})