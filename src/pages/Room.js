import React, { useEffect, useState } from 'react'
import firebase from '../Config/firebase'
import 'firebase/firestore'
import { useContext } from 'react/cjs/react.development'
import { AuthContext } from '../AuthService'

const Room = () => {
    const [messages, setMessages] = useState('null')
    const [value, setValue] = useState('')
    const user = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()
        firebase.firestore().collection('message')
            .add({
                content: value,
                user: user.displayName,
                date: new Date()
            })
        setMessages([
            ...messages,
            {
                user: user.displayName,
                email: user.email,
                content: value
            }
        ])
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
                <li>
                    sample user : sample message
                </li>
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