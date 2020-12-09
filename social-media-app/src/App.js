import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/header/header";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/home/home"));

function App() {
  return (
    <div>
      <Header />
      <div className="main container">
        <Router>
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;
