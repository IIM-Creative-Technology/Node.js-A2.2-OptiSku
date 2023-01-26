const btn = document.getElementById("btnFetch")
const ul = document.querySelector("ul")
const btnSocket = document.getElementById("btnSocket")
const socketList = document.querySelector(".socketList")
const btnChat = document.getElementById("Chat")
const myName = "Clément"

btn.addEventListener("click", ()=> {
    fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify({
            'school': "aaaaaaa",
            'year': 2023
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        const li = document.createElement('li')
        li.innerText = JSON.stringify(data.school)
        ul.append(li)
    })
})

const socket = io('http://localhost:3000')

btnSocket.addEventListener("click", () => {
    socket.emit("message",
    {
        msg: 'HI !'
    })
})
btnChat.addEventListener("click", () => {
    const message = document.getElementById("message").value
    socket.emit("message",
    {
        Name: myName,
        msg: message
    })
    
})

socket.on('serv message', (msg) => {
    const name = document.createElement('li')
    name.innerText = msg.Name
    socketList.append(name)
    const text = document.createElement('li')
    text.innerText = msg.msg
    socketList.append(text)
})