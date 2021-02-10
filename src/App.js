import firebase from './plugins/firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import './App.css';
import Top from "./pages/top.js"
import Signin from "./pages/signin.js"

let isAuthenticated;
const App = () => {
  return (
    <section className="App">
     <Router>
     <Link to="/">トップ</Link>
      <Link to="/signin">サインイン</Link>
     <Switch>

      <Route exact path="/" component={Top}/>
      <Route exact path="/signin" component={Signin} />
      </Switch>
      </Router>
    </section>
  );
}

// const isSignedIn = () =>  {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // 直接アクションをディスパッチ
//       isAuthenticated = true
//     }
//     else {
//       // 直接アクションをディスパッチ
//       isAuthenticated = false
//     }
//   })
// }
export default App;
