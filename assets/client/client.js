const socket = io()

const ul = document.querySelector('#messages')
const scrollMsg = () => {
    ul.scrollTop = 99999999999999999999;
}

const m = document.querySelector('#m')
document.querySelector('#chat').addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat message', m.value)
    m.value = ''
    return false;
})

const username = document.querySelector('#name')
document.querySelector('#login').addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('new user', username.value)
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.chat').style.display = 'block';
    return false;
})

socket.on('chat message', data => {
    const d = new Date()
    const el = document.createElement('li')
    el.innerText = d.getHours() + 'h' + d.getMinutes() + ' | ' + data.user + ' -> ' + data.msg
    document.querySelector('#messages').appendChild(el);
    scrollMsg()
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