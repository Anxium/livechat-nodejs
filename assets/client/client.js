const socket = io()

const m = document.querySelector('#m')
document.querySelector('form').addEventListener('submit', e => {
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