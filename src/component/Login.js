import React, { useState } from 'react'
import '../CSS/Login.css'

import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';


function Login() {
    // const [signInData, setSignInData ] = useState('')
    const [ {}, dispatch ] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
             dispatch({
                 type: actionTypes.SET_USER,
                 user: result.user,
             })
            // setSignInData(result);
        })
        .catch((err) => alert(err.message))
    };
    
    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
                    alt='whatsApp'
                    style={{ width: 400, height: 400}}
                />
                <div className='login_text'>
                    <h1>Sign in to WhatsAppClone</h1>
                </div>
                <Button  onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
