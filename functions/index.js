const functions = require('firebase-functions');
const express = require('express');

const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
const APP_ID = functions.config().app.id;
const APP_CERTIFICATE = functions.config().app.certificate;
const PORT = 8080;

const app = express();

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

app.get('/access_token', nocache, (req, res) => {

  res.header('Acess-Control-Allow-Origin', '*');

  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(500).json({ 'error': 'channel is required' });
  }

  let uid = req.query.uid;
  if(!uid || uid == '') {
    uid = 0;
  }

  let role = RtcRole.SUBSCRIBER;
  if (req.query.role == 'publisher') {
    role = RtcRole.PUBLISHER;
  }

  let expireTime = req.query.expireTime;
  if (!expireTime || expireTime == '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);

  return res.send({ 'token': token ,'appId': APP_ID});
});


const api = functions.https.onRequest(app);
module.exports = { api };