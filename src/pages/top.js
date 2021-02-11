import React, { useState } from 'react'
import firebase from '../plugins/firebase'
import '../assets/stylesheets/pages/top.scss'
import { Icon, InlineIcon } from '@iconify/react'
import signoutIcon from '@iconify-icons/uil/signout'
import {
  startBasicCall,
  join,
  leave,
  publish,
  unpublish,
} from '../plugins/agora.js'

const database = firebase.database()
const room_name = 'main-room'
window.addEventListener('beforeunload', (event) => {
  event.preventDefault()
  event.returnValue = ''
})
window.addEventListener('unload', (event) => {
  event.preventDefault()
  leave()
  const user = firebase.auth().currentUser
  database.ref(`${room_name}/${user.uid}`).remove()
  event.returnValue = ''
})

startBasicCall()

const Top = () => {
  const [prticipants, setPrticipants] = useState()
  const [is_joined, setIsJoined] = useState(false)

  const setPrticipant = (agora_id) => {
    const user = firebase.auth().currentUser
    database.ref(`${room_name}/${user.uid}`).set({
      agora_id: agora_id,
      user_id: user.uid,
      name: user.displayName,
    })
  }
  const getprticipants = () => {
    const res = database.ref(room_name).on('value', (res) => {
      const data = res.val()
      if (data) {
        const array = Object.keys(data).map((key) => {
          return {
            agora_id: data[key].agora_id,
            name: data[key].name,
          }
        })
        return array
      } else {
        return null
      }
    })
  }

  const joinHundler = async () => {
    const agora_id = await join()
    setPrticipant(agora_id)
    database.ref(room_name).on('value', (res) => {
      const data = res.val()
      if (data) {
        const array = Object.keys(data).map((key) => {
          return {
            agora_id: data[key].agora_id,
            name: data[key].name,
          }
        })

        setPrticipants((prticipants) =>
          array.map((el) => [el.agora_id, el.name])
        )
        setIsJoined(true)
      }
    })
  }

  const leaveHundler = async () => {
    leave()
    const user = firebase.auth().currentUser
    database.ref(`${room_name}/${user.uid}`).remove()
    database.ref(room_name).on('value', (res) => {
      const data = res.val()
      if (data) {
        const array = Object.keys(data).map((key) => {
          return {
            agora_id: data[key].agora_id,
            name: data[key].name,
          }
        })
        setPrticipants((prticipants) =>
          array.map((el) => [el.agora_id, el.name])
        )
      } else {
        setPrticipants((prticipants) => null)
      }
    })
    setIsJoined(false)
  }
  const Signout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }
  const JoinedButtons = () => {
    return (
      <div id="joind-buttons">
        <input type="radio" id="leave" onClick={leaveHundler} />
        <label htmlFor="leave">👋 退出する</label>
        <input type="radio" id="publish" name="mute" onClick={publish} />
        <label htmlFor="publish">🔊 しゃべる</label>
        <input type="radio" id="unpublish" name="mute" onClick={unpublish} />
        <label htmlFor="unpublish">🔇 ミュート</label>
      </div>
    )
  }
  return (
    <section id="top">
      <div id="main">
        <div id="image-container">
          {is_joined ? (
            <img
              src="https://3.bp.blogspot.com/-tRbm_EcL2Ag/W4PJ8J3P56I/AAAAAAABOLM/v6GP9sTmHxAkCFm0pYepTeqw02UE82afwCLcBGAs/s400/room_yuka_tatami_old.png"
              id="joined-img"
              className="top-image"
            />
          ) : (
            <img
              src="https://3.bp.blogspot.com/-ug0NOvztbBc/UV1JEk1n3eI/AAAAAAAAPSE/8G6UXvctb6I/s400/door.png"
              id="not-joined-img"
              className="top-image"
            />
          )}
        </div>
        <div id="button-container">
          {is_joined ? (
            <JoinedButtons />
          ) : (
            <div>
              <button id="join" onClick={joinHundler}>
                🚪 ノックする
              </button>
              <Icon
                icon={signoutIcon}
                onClick={Signout}
                color="red"
                width="30"
                height="30"
                id="signout"
              />
            </div>
          )}
        </div>
      </div>
      <div id="menus">
        <div id="list-title">
          {prticipants ? (
            <span>
              参加者 (<span id="numOfParticipants">{prticipants.length}</span>)
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <div id="list">
          <ul>
            {prticipants
              ? prticipants.map((prticipant, i) => {
                  const user = { agora_id: prticipant[0], name: prticipant[1] }
                  return <li key={i}>{user.name}</li>
                })
              : null}
          </ul>
        </div>
      </div>
    </section>
  )
}
export default Top
