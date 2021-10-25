import { Route, Switch} from "react-router-dom";
import './App.css';
import Login from "./components/Login/Login";
import {NavBar} from "./components/NavBar/NavBar";
import Home from "./components/Home/Home"
import { Team } from "./components/Team/Team";
import { Detail } from "./components/Detail/Detail";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (

    <div className="App">
      <Route component={NavBar} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/team" component={Team} />
        <Route component={NotFound} />
      </Switch>
    </div>

  );
}

export default App;
