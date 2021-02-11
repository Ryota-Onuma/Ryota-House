import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Top from "./pages/top.js"
import Signin from "./pages/signin.js"
import Auth from "./components/Auth";
import Header from "./components/Header"
const App = () => {
  return (
    <section className="App">
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
    </section>
  );
}


export default App;
