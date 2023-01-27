const btn = document.getElementById("btnFetch")
const ul = document.querySelector("ul")
const btnSocket = document.getElementById("btnSocket")
const socketList = document.querySelector(".socketList")
const btnChat = document.getElementById("Chat")
const myName = "Clément"

const submitBtn = document.getElementById('submitBtn')


// btn.addEventListener("click", ()=> {
//     fetch("http://localhost:3000/", {
//         method: "POST",
//         body: JSON.stringify({
//             'school': "aaaaaaa",
//             'year': 2023
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         console.log(data)
//         const li = document.createElement('li')
//         li.innerText = data.school
//         ul.append(li)
//     })
// })

btn.addEventListener("click", () => {
    fetch("http://localhost:3000/api/user", {
        method: "GET",
    }).then(d => {
        return d.json()
    }).then(dd => {
        const firstName = document.querySelector("#firstName");
        const lastName = document.querySelector("#lastName");
        const email = document.querySelector("#email");
        
        firstName.innerHTML = dd.firstName;
        lastName.innerHTML = dd.lastName;
        email.innerHTML = dd.email;
    })
});

const ulAccountInfo = document.querySelector(".showAccountInfo")
submitBtn.addEventListener("click", () => {
    let firstNameForm = document.querySelector('.formFName')
    let lastNameForm = document.querySelector('.formLName')
    let emailForm = document.querySelector('.formMail')

    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    console.log(firstName.value,lastName.value,email.value)
    fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify({
            'firstName': firstNameForm.value,
            'lastName': lastNameForm.value,
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
            // console.log(`${property}: ${data[property]}`);
            let li = document.createElement('li')
            li.innerText = data[property]
            ulAccountInfo.append(li)
        }
        // firstName.innerHTML = data.firstName;
        // lastName.innerHTML = data.lastName;
        // email.innerHTML = data.email;
    })
})

// Socket

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