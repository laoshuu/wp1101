import "./App.css";
import Home from "./component/Home";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  BrowserRouter as Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" >
              <Home />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

