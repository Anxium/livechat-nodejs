const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const pug = require('pug')

app.set('view engine', 'pug')
app.use(express.static('./views/css'))
app.use(express.static('./node_modules/socket.io-client'))
app.use(express.static('./assets'))

app.get('/', (req, res) => res.render('index'))

io.on('connection', socket => {
    console.log('A user connected')

    socket.on('chat message', msg => {
        console.log('message : ' + msg)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('A user disconncted')
    })
})

const port = 3000
http.listen(port, () => console.log(`Serveur propulsé sur l'adresse http://localhost:${port}`))