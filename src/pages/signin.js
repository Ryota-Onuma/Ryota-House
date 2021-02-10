import React from 'react';
import firebase from '../plugins/firebase'
import { Redirect } from 'react-router-dom'


const Signin = () => {

  const signinMethod = async () => {
    try{
      console.log('aaaaa')
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        'login_hint': 'user@example.com'
      });
      const result =  await firebase.auth().signInWithPopup(provider)
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
  
    }catch(error){
      console.log(error)
    }
  }
  
  const user = firebase.auth().currentUser

  return(
    <section id="signin" >
      <span onClick={signinMethod}>signin</span> 
    </section>
  )
}

export default Signin;