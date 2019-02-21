/* CONFIG FIREBASE */
const config = {
    apiKey: "AIzaSyDmn75cYckDBvvm41IYEjc79-TPr_1s5tI",
    authDomain: "messenger-node.firebaseapp.com",
    databaseURL: "https://messenger-node.firebaseio.com",
    projectId: "messenger-node",
    storageBucket: "messenger-node.appspot.com",
    messagingSenderId: "583194645893"
};
firebase.initializeApp(config);

document.querySelector('#login').addEventListener('submit', e => {
    e.preventDefault()

    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(result => {
        console.log(result)
        window.localStorage.setItem('username', result.additionalUserInfo.username)
        window.location = '/chat'
    })
    .catch(error => {
        console.log(error)
    });
})