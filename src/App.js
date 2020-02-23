import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Error from "./pages/Error";
import SingleRoom from "./pages/SingleRoom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { RoomProvider } from "./Context";

export default function App() {
  return (
    <div className="App">
      <RoomProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/room" component={Room} />
            <Route exact path="/room/:slug" component={SingleRoom} />
            <Route component={Error} />
          </Switch>
        </Router>
      </RoomProvider>
    </div>
  );
}
