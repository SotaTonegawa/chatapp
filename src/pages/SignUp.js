import React, { useState } from 'react' //予めuseStateをimportすることでReact.を省略可能
// import { Redirect } from 'react-router-dom'
import firebase from '../Config/firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted!');
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                user.updateProfile({
                    displayName: name
                })
                // inputの中身を空にしたいが方法がわからない...
                // setEmail('')
                // setPassword('')
                // setName('')
                alert('ユーザー登録が完了しました！')
                // ユーザー登録後ログイン画面に遷移したい
                // return <Redirect to='/login' />
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        name='email'
                        type='email'
                        id='email'
                        placeholder='email'
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        id='password'
                        placeholder='password'
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='userName'>user name</label>
                    <input
                        name='userName'
                        type='userName'
                        id='userName'
                        placeholder='userName'
                        onChange={e => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp