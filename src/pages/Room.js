import React, { useEffect, useState, useContext } from 'react'
import firebase from '../Config/firebase'
import 'firebase/firestore'
import { AuthContext } from '../AuthService'
import shortid from 'shortid'
import styled from 'styled-components'

const RoomUl = styled.ul`
    background-color: #fff;
    width: 55%;
    margin: 50px 0 0 100px;
    border-radius: 10px;
    height: 500px;
    overflow: scroll;
`;

const RoomList = styled.li`
    list-style: none;
    color: #000;
    margin-bottom: 10px;
    text-align: left;
`;

const inputForm = styled.div`
    background-color: #fff; 
    width: 55%;
    margin-left: 50px;
`;

const Room = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const user = useContext(AuthContext)

    const sortMessages = array => {
        array.sort((a, b) => {
            if (a.date.seconds < b.date.seconds) {
                return -1;
            } else {
                return 1;
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('messages')
            .add({
                content: value,
                user: user.displayName,
                date: new Date(),
                id: shortid.generate()
            })
        setValue('');
    }


    useEffect(() => {
        firebase.firestore().collection('messages')
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setMessages(messages)
            });
    }, [])

    return (
        <>
            <h1>Room</h1>
            <RoomUl>
                {sortMessages(messages)}
                {
                    messages ?
                        messages.map(message => {
                            const messageDay = new Date(message.date.seconds * 1000);
                            let year = messageDay.getFullYear()
                            let month = messageDay.getMonth()
                            let date = messageDay.getDate()
                            let hour = messageDay.getHours()
                            let minutes = messageDay.getMinutes()
                            let uniqueId = message.id
                            return <RoomList key={uniqueId}>{year}/{month + 1}/{date} {hour}:{minutes}<br></br>{message.user} : {message.content}</RoomList>
                        }) : <p>Loading...</p>
                }
            </RoomUl>
            <inputForm>
                <form onSubmit={handleSubmit}>
                    <input
                        text='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        autoComplete='off'
                    />
                    <button type='submit'>送信</button>
                </form>
                <button onClick={() => firebase.auth().signOut()}>Logout</button>
            </inputForm>
        </>
    )
}

export default Room