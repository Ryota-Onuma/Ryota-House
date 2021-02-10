import React from 'react';
import { startBasicCall,join,leave,publish,unpublish } from "../plugins/agora.js"
const top = () => {

  startBasicCall();

  return(
    <section id="top">
    <div id="button-container">
    <button id="join" onClick={join}>▶️ Join</button>
      <button id="leave" onClick={leave}>⏹ Leave</button>
      <button id="publish" onClick={publish}>🔊 Publish (unmute)</button>
      <button id="unpublish" onClick={unpublish}>🔇 Unpublish (mute)</button>
    </div>
    
      <p>Your ID: <span id="userId"></span></p>
      <p>Participants (<span id="numOfParticipants">0</span>):</p>
      <ul id="participantList"></ul>
    </section>
  )
}
export default top