import React from 'react'
import { Button } from '@material-ui/core'
import {signInWithPopup} from 'firebase/auth'
import { auth, provider} from '../firebase.js'
import { actionTypes } from './reducer.js'
import { useStateValue } from './StateProvider.js'
import './Login.css'

const Login = () => {
    const [{}, dispatch] = useStateValue()
    const signIn = async () => {
        await signInWithPopup(auth, provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="logo512.png" alt="whatsapp" />
                <div className="login__text">
                    <h1>Sign in to Messaging App</h1>
                </div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}
export default Login
