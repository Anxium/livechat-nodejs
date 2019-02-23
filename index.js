const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const pug = require('pug')

// AUTRE
app.set('view engine', 'pug')
app.use(express.static('./views/css'))
app.use(express.static('./node_modules/socket.io-client'))
app.use(express.static('./assets'))

// ROUTES
app.get('/', (req, res) => res.render('login'))
app.get('/chat', (req, res) => res.render('index'))

// GESTION DES EVENTS
io.on('connection', socket => {

    socket.on('new user', username => {
        socket.user = username
        socket.emit('new user', username)
        console.log(username + ' is connected')
    })

    socket.on('chat message', msg => {
        socket.broadcast.emit('chat message', {
            msg: msg,
            user: socket.user
        })
        console.log(socket.user + ' send ' + msg)
    })

    socket.on('disconnect', () => {
        io.emit('disconnect', socket.user)
        console.log(socket.user + ' disconnected')
    })

})

// Propulse le serveur sur le port choisi
const port = 3000
http.listen(process.env.PORT || port, () => console.log(`Serveur propulsé sur l'adresse http://localhost:${port}`))