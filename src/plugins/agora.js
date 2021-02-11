import AgoraRTC from 'agora-rtc-sdk-ng'
import axios from 'axios'
const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' })

var rtc = {
  client: null,
  localAudioTrack: null,
}

export const join = async () => {
  const channelName = 'hogehoge'
  const res = await axios.get(
    `https://us-central1-ryota-house.cloudfunctions.net/api/access_token?channelName=${channelName}`
  )

  const uid = await rtc.client.join(
    res.data.appId,
    channelName,
    res.data.token,
    null
  )

  return uid
}
export const leave = () => {
  if (rtc.localAudioTrack) {
    rtc.localAudioTrack.close()
  }
  rtc.client.leave()
}

export const publish = async () => {
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
  // Publish the local audio track to the channel.
  await rtc.client.publish([rtc.localAudioTrack])
}

export const unpublish = async () => {
  await rtc.client.unpublish()
}

const userPublished = async (user, mediaType) => {
  await rtc.client.subscribe(user, mediaType)
  if (mediaType === 'audio') {
    const remoteAudioTrack = user.audioTrack
    remoteAudioTrack.play()
  }
}

const userUnPublished = async (user) => {}
export const startBasicCall = () => {
  rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
  rtc.client.on('user-published', async (user, mediaType) =>
    userPublished(user, mediaType)
  )
  rtc.client.on('user-unpublished', (user) => userUnPublished(user))
}
