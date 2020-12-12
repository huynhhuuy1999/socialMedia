import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/header/header";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/home/home"));
const Profile = lazy(() => import("./pages/profile/profile"));
const EditUser = lazy(() => import("./pages/editUser/editUser"));
const Login = lazy(() => import("./pages/login/login"));

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="main container">
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/profile/:id" component={Profile}/>
              <Route path="/edit" component={EditUser}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
