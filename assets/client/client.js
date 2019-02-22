const config = {
    apiKey: "AIzaSyDmn75cYckDBvvm41IYEjc79-TPr_1s5tI",
    authDomain: "messenger-node.firebaseapp.com",
    databaseURL: "https://messenger-node.firebaseio.com",
    projectId: "messenger-node",
    storageBucket: "messenger-node.appspot.com",
    messagingSenderId: "583194645893"
};
firebase.initializeApp(config);

const db = firebase.firestore();

// Récupération des données stockées dans le localStorage
let usernameGit = window.localStorage.getItem('username')

if (usernameGit === null) {
    window.location = '/'
}

const socket = io()

const d = new Date()

// Fonction pour scroll au bas de la liste à chaque message
const ul = document.querySelector('#messages')
const scrollMsg = () => {
    ul.scrollTop = ul.scrollHeight;
}

// Fonction qui émet le message au serveur
const m = document.querySelector('#m')
document.querySelector('#chat').addEventListener('submit', e => {
    e.preventDefault()

    m.value = m.value.trim()
    if(m.value != '' && m.value.length > 1) {
        socket.emit('chat message', m.value)
    
        // db.collection("usersMessages").add({
        //     user: usernameGit,
        //     msg: m.value,
        //     timestamp: d.getTime()
        // })
        // .then(docRef => {
        //     console.log("Document written with ID: ", docRef.id)
        // })
        // .catch(error => {
        //     console.error("Error adding document: ", error)
        // })
        
        m.value = ''
    } else {
        alert('Votre message ne doit pas être vide ou doit faire plus d\'un caractère')
    }

    return false;
})

// Emet la connection d'un utilisateur au serveur avec son pseudo Git
socket.on('connect', () => {
    socket.emit('new user', usernameGit)

    // db.collection("usersMessages").get()
    // .then(querySnapshot => {
    //     querySnapshot.forEach((doc) => {
    //         const el = document.createElement('li')
    //         el.innerText = doc.data().sendTime + ' | ' + doc.data().user + ' -> ' + doc.data().msg
    //         document.querySelector('#messages').appendChild(el)
    //         scrollMsg() // Appel de la fonction scroll
    //     })
    // })

})

// Fonctions qui se lancent lors de la réception d'un event quelconque
socket.on('chat message', data => {
    const el = document.createElement('li')
    el.innerText = d.getHours() + 'h' + d.getMinutes() + ' | ' + data.user + ' -> ' + data.msg
    document.querySelector('#messages').appendChild(el)
    scrollMsg() // Appel de la fonction scroll
})

socket.on('new user', username => {
    const el = document.createElement('li')
    el.innerText = `${username} s'est connecté`
    document.querySelector('#messages').appendChild(el);

    // const online = document.createElement('li')
    // online.innerText = username
    // document.querySelector('#onlines').appendChild(online)
})

socket.on('disconnect', username => {
    const el = document.createElement('li')
    el.innerText = `${username} s'est déconnecté`
    document.querySelector('#messages').appendChild(el);
})