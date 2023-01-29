const btn = document.getElementById("btnFetch")
const ul = document.querySelector("ul")
const socketList = document.querySelector(".socketList")
const btnChat = document.getElementById("Chat")

const submitBtn = document.getElementById('submitBtn')
const submitBtnSignUp = document.getElementById('submitBtnSignUp')
let userConnecte = []



const allAccount = document.querySelector(".allAccount")
btn.addEventListener("click", () => {
    fetch("http://localhost:3000/api/user", {
        method: "GET",
    }).then(d => {
        return d.json()
    }).then(dd => {

        for (let i = 0; i < dd.length; i++) {
            for (const property in dd[i]) {
                if (property != 'password' && property != '__v' && property != '_id') {
                    // console.log(dd[i][property])
                    let li = document.createElement('li')
                    li.innerText += dd[i][property]
                    allAccount.append(li)
                }
            }
            let li = document.createElement('li')
            li.innerText += "-------------------------"
            allAccount.append(li)
        }
    })
});

const ulAccountInfo = document.querySelector(".showAccountInfo")
submitBtn.addEventListener("click", () => {
    let firstNameForm = document.querySelector('.formFName')
    let passwordForm = document.querySelector('.password')
    let emailForm = document.querySelector('.formMail')
    fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify({
            'firstName': firstNameForm.value,
            'password': passwordForm.value,
            'email': emailForm.value
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
        for (const property in data) {
            let li = document.createElement('li')
            li.innerText = data[property]
            ulAccountInfo.append(li)
        }
    })
})

submitBtnSignUp.addEventListener("click", () => {
    let NameSignUp = document.querySelector('.formFNameEmail')
    let passwordSignUp = document.querySelector('.passwordSignUp')
    let loggedTitle = document.querySelector('.logged')
    let loggedName = document.querySelector('.loggedName')
    fetch(`http://localhost:3000/api/user/${NameSignUp.value}/${passwordSignUp.value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        if(data[0].length != 0) {
            loggedTitle.innerText = "Connecté avec : "
            loggedName.innerText = data[0].name
            userConnecte = [data[0]]
        }
    })
})

// Socket

const socket = io('http://localhost:3000')

btnChat.addEventListener("click", () => {
    const message = document.getElementById("message").value
    if (userConnecte.length > 0) {
        messagename = userConnecte[0].name;
      } else {
        messagename = "Anonyme";
      }
    socket.emit("message",
    {
        
        Name: messagename,
        msg: message
    })
    
})

socket.on('serv message', (msg) => {
    const textName = document.createElement('li')
    textName.innerText = msg.Name
    socketList.append(textName)
    const text = document.createElement('li')
    text.innerText = msg.msg
    socketList.append(text)
})