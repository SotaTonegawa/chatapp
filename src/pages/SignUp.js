import React, { useState } from 'react' //予めuseStateをimportすることでReact.を省略可能
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
                alert('ユーザー登録が完了しました！')
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div id='sign-up'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        name='email'
                        type='email'
                        id='email'
                        placeholder='email'
                        autoComplete='off'
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
                        autoComplete='off'
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
            <a href='/Login#login'>ログイン画面はこちら</a>
        </div>
    )
}

export default SignUp