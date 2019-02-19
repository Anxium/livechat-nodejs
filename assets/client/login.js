const socket = io()

const username = document.querySelector('#name')
document.querySelector('#login').addEventListener('submit', () => {
    socket.emit('new user', username.value)
})