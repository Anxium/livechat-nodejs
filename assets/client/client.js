const socket = io()

const m = document.querySelector('#m')
document.querySelector('#chat').addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat message', m.value)
    m.value = ''
    return false;
})

socket.on('chat message', msg => {
    const el = document.createElement('li')
    el.innerText = msg
    document.querySelector('#messages').appendChild(el);
})

socket.on('connection', username => {
    const el = document.createElement('li')
    el.innerText = `${username} s'est connecté`
    document.querySelector('#messages').appendChild(el);
})