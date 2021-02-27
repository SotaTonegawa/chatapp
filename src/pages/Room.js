import React, { useEffect, useState, useContext } from 'react'
import firebase from '../Config/firebase'
import 'firebase/firestore'
import { AuthContext } from '../AuthService'
import styled from 'styled-components'

const RoomUl = styled.ul`
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
`;

const RoomList = styled.li`
    list-style: none;
    color: #000;
    margin-bottom: 10px;
    text-align: left;
`;

const Room = () => {
    const [messages, setMessages] = useState(null)
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
        console.log(messages);
        console.log(firebase.firestore().collection('messages'))
        setValue('');
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
            <RoomUl>
                {
                    messages ?
                        messages.map(message => {
                            const messageDay = new Date(message.date.seconds * 1000);
                            let year = messageDay.getFullYear()
                            let month = messageDay.getMonth()
                            let date = messageDay.getDate()
                            let hour = messageDay.getHours()
                            let minutes = messageDay.getMinutes()
                            return <RoomList>{year}/{month + 1}/{date} {hour}:{minutes}   {message.user} : {message.content}</RoomList>
                        }) : <p>Loading...</p>
                }
            </RoomUl>
            <form onSubmit={handleSubmit}>
                <input
                    text='text'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button type='submit'>送信</button>
            </form>
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </>
    )
}

export default Room