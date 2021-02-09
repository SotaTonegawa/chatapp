import React, { useEffect, useState, useContext } from 'react'
import firebase from '../Config/firebase'
import 'firebase/firestore'
import { AuthContext } from '../AuthService'

const Room = () => {
    const [messages, setMessages] = useState('null')
    const [value, setValue] = useState('')

    const user = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('messages')
            .add({
                content: value,
                user: user.displayName,
                date: new Date()
            })
        console.log('submitted!');
    }

    useEffect(() => {
        firebase.firestore().collection('messages')
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setMessages(messages)
            })
    }, [])

    return (
        <>
            <h1>Room</h1>
            <ul>
                {/* <li>
                    sample user : sample message
                </li> */}
                {
                    messages ?
                        messages.map(message => (
                            <li>{message.user} : {message.content}</li>
                        )) : <p>Loading...</p>
                }
            </ul>
            <form>
                <input
                    text='text'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button type='submit' onSubmit={handleSubmit}>送信</button>
            </form>
            <button onClick={() => firebase.auth().signOut()}> Logout</button>
        </>
    )
}

export default Room