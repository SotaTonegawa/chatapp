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
    height: 1700px;
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
                messages.sort((a, b) => {
                    if (a.date < b.date) {
                        return -1
                    } else {
                        return 1;
                    }
                });
            });
    }, [])

    // const sortMessages = messages.sort((a, b) => {
    //     if (a.date < b.date) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // });

    // console.log(sortMessages);

    //最新50件のみ表示させるための関数を作成したい
    // let ary1 = [];
    // for (let i = 0; i < 50; i++) {

    // }

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
                            let uniqueId = message.id
                            return <RoomList key={uniqueId}>{year}/{month + 1}/{date} {hour}:{minutes}   {message.user} : {message.content}</RoomList>
                        }) : <p>Loading...</p>
                }
            </RoomUl>
            {/* ここのdivをスクロールで縦移動させたい */}
            <div>
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
            </div>
        </>
    )
}

export default Room