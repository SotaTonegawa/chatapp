import React, { useState, useContext } from 'react'
import firebase from '../Config/firebase'
import { AuthContext } from '../AuthService'
import { Redirect } from 'react-router-dom'

//historyに分割代入
const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push("/")
            })
            .catch(err => {
                console.log('err')
            })
    }

    const user = useContext(AuthContext)

    if (user) {
        return <Redirect to="/" />
    }

    const toSignUp = () => {
        return <Redirect to="/Signup" />
    }

    return (
        <div id='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='email'
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='password'
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <a href='/Signup#sign-up' onClick={toSignUp}>初めての方はこちら</a>
        </div>
    )
}

export default Login