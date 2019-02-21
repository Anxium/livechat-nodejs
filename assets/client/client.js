// Récupération des données stockées dans le localStorage
let usernameGit = window.localStorage.getItem('username')

if(usernameGit === null) {
    window.location = '/'
}

const socket = io()

// Fonction pour scroll au bas de la liste à chaque message
const ul = document.querySelector('#messages')
const scrollMsg = () => {
    ul.scrollTop = ul.scrollHeight;
}

// Fonction qui émet le message au serveur
const m = document.querySelector('#m')
document.querySelector('#chat').addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat message', m.value)
    m.value = ''
    return false;
})

// Emet la connection d'un utilisateur au serveur avec son pseudo Git
socket.on('connect', () => {
    socket.emit('new user', usernameGit)
})

// Fonctions qui se lancent lors de la réception d'un event quelconque
socket.on('chat message', data => {
    const d = new Date()
    const el = document.createElement('li')
    el.innerText = d.getHours() + 'h' + d.getMinutes() + ' | ' + data.user + ' -> ' + data.msg
    document.querySelector('#messages').appendChild(el)
    scrollMsg() // Appel de la fonction scroll
})

socket.on('new user', username => {
    const el = document.createElement('li')
    el.innerText = `${username} s'est connecté`
    document.querySelector('#messages').appendChild(el);

    const online = document.createElement('li')
    online.innerText = username
    document.querySelector('#onlines').appendChild(online)
})

socket.on('disconnect', username => {
    const el = document.createElement('li')
    el.innerText = `${username} s'est déconnecté`
    document.querySelector('#messages').appendChild(el);
})