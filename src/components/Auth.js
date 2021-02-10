import React from 'react'
import { Redirect } from 'react-router-dom'

const Auth = (props) => (props.currentUser.isLoggedIn ? props.children : <Redirect to={'/Login'}/>)

export default Auth