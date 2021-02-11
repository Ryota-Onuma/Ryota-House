import React from 'react'
import firebase from '../plugins/firebase'
import '../assets/stylesheets/components/header.scss'
import { Icon, InlineIcon } from '@iconify/react'
import signoutIcon from '@iconify-icons/uil/signout'
class Header extends React.Component {
  state = {
    userName: null,
    userImage: null,
  }
  _isMounted = false //unmountを判断（エラー防止用）
  componentDidMount = () => {
    //mountされてる
    this._isMounted = true

    //ログインしてるかどうかチェック
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this._isMounted) {
          this.setState({
            userName: user.displayName,
            userImage: user.photoURL,
          })
        }
      } else {
        //してない
        if (this._isMounted) {
          this.setState({
            userName: null,
            userImage: null,
          })
        }
      }
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }
  Signout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    if (this.state.userName) {
      return (
        <header>
          <div id="header-left">
            <span>Ryota House</span>
          </div>
          <div id="header-right">
            <img src={this.state.userImage} />
            <span>{this.state.userName}</span>
            <Icon
              icon={signoutIcon}
              onClick={this.Signout}
              color="red"
              width="30"
              height="30"
            />
          </div>
        </header>
      )
    } else {
      return <header></header>
    }
  }
}
export default Header
