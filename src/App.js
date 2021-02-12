import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Top from "./pages/top.js"
import Signin from "./pages/signin.js"
import Auth from "./components/Auth";
import Header from "./components/Header"
import Platform from 'react-platform-js'
import "./assets/stylesheets/app.scss"

const App = () => {
  const [is_appropriate_browser,SetAppropriateBrowser] = useState(true)
  useEffect(
    () => {
      const browser = Platform.Browser;
      switch (browser) {
        case 'Line':
          SetAppropriateBrowser(false)
          break;
        case 'IE':
          SetAppropriateBrowser(false)
          break;
        case 'Opera Touch':
          SetAppropriateBrowser(false)
          break;
        case 'Opera':
          SetAppropriateBrowser(false)
          break;
        default:
         
      }
    },
    []
);

const BasePage = () => {
  return(
    <Router>  
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Auth>
        <Header />
        <Switch>
          <Route exact path="/" component={Top}/>
        </Switch>
      </Auth>
    </Switch>
  </Router>
  )
}
const InvalidBrowserPage = () => {
  return(
    <div id="invalid-page">
      <h1>Ryota Houseへようこそ</h1>
      <br/>
      <h1>このブラウザは</h1><h1>サポートされていません</h1>
      <br/>
      <h1>別のブラウザを使ってください。</h1>
      <h1>※ SNSアプリ内蔵ブラウザではなく、</h1>
      <h1>ブラウザ専用アプリよりアクセスすることをおすすめします</h1>
      <div id="browser-info">
        <h2>ご利用環境</h2>
        <div className="browser-info-parts">
          {"OS: " + Platform.OS}
        </div>
        <div className="browser-info-parts">
          {"OSVersion: " + Platform.OSVersion} 
        </div>

          <div className="browser-info-parts">
          {"Browser: " + Platform.Browser} 
        </div>
        <div className="browser-info-parts">
        {"BrowserVersion: " + Platform.BrowserVersion} 
          </div>
          <div className="browser-info-parts">
          {"Engine: " +  Platform.Engine} 
        </div>
          <div className="browser-info-parts"> 
          {"DeviceType: " +  Platform.DeviceType} 
        </div>  
        <div className="browser-info-parts">
          {"DeviceModel: " +  Platform.DeviceModel} 
        </div> 
        <div className="browser-info-parts">
          {"DeviceVendor: " +  Platform.DeviceVendor} 
        </div>
    </div>
    </div>
  )
}
  return (
    <section className="App">
      {is_appropriate_browser ? <BasePage /> : <InvalidBrowserPage />}
    </section>
  );
}


export default App;
