import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    //認証情報を記述
    apiKey: "AIzaSyDu65nEmYXFiVJSVpnbCWy1dUU1MKqXF1E",
    authDomain: "chat-app-3320e.firebaseapp.com",
    projectId: "chat-app-3320e",
    storageBucket: "chat-app-3320e.appspot.com",
    messagingSenderId: "924201044216",
    appId: "1:924201044216:web:ec7976d2bfdbdae296530d",
    measurementId: "G-6P5N5MEZHW"
}

firebase.initializeApp(firebaseConfig)

export default firebase