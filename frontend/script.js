const btn = document.getElementById("btnFetch")
const ul = document.querySelector("ul")
const btnSocket = document.getElementById("btnSocket")
const socketList = document.querySelector(".socketList")

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
        li.innerText = data.school
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

socket.on('serv message', (msg) => {
    const li = document.createElement('li')
    li.innerText = msg
    socketList.append(li)
})