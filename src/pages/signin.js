import React from 'react'
import firebase from '../plugins/firebase'
import { Redirect } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay'
import { Icon, InlineIcon } from '@iconify/react'
import googleIcon from '@iconify-icons/grommet-icons/google'
import '../assets/stylesheets/pages/signin.scss'
class Signin extends React.Component {
  state = {
    signinCheck: false, //ログインチェックが完了してるか
    signedIn: false, //ログインしてるか
  }

  _isMounted = false //unmountを判断（エラー防止用）

  componentDidMount = () => {
    //mountされてる
    this._isMounted = true

    //ログインしてるかどうかチェック
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //してる
        if (this._isMounted) {
          this.setState({
            signinCheck: true,
            signedIn: true,
          })
        }
      } else {
        //してない
        if (this._isMounted) {
          this.setState({
            signinCheck: true,
            signedIn: false,
          })
        }
      }
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  signinMethod = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.setCustomParameters({
        login_hint: 'user@example.com',
      })
      const result = await firebase.auth().signInWithPopup(provider)
      const credential = result.credential
      const token = credential.accessToken
      const user = result.user
      ;<Redirect from="/signin" to="/" />
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    //チェックが終わってないなら（ローディング表示）
    if (!this.state.signinCheck) {
      return (
        <LoadingOverlay active={true} spinner text="Loading...">
          <div style={{ height: '100vh', width: '100vw' }}></div>
        </LoadingOverlay>
      )
    }

    //チェックが終わりかつ
    if (this.state.signedIn) {
      console.log(this.state.signedIn)
      //サインインしてるとき（そのまま表示）
      return <Redirect from="/signin" to="/" />
    } else {
      return (
        <section id="signin">
          <h1 id="title">Ryota House</h1>
          <div id="signin-parts">
            <h1 id="sign-in-with">Sign in with...</h1>
            <div id="sign-in-methods">
              <button onClick={this.signinMethod}>
                <Icon icon={googleIcon} width="50" height="50" />
              </button>
            </div>
          </div>
          <div id="browser-alert">
            <h5>
              {' '}
              ※
              SNSアプリ内蔵ブラウザではなく、ブラウザ専用アプリよりアクセスしてください
            </h5>
          </div>
        </section>
      )
    }
  }
}

export default Signin
