import React from "react";
import ReactDOM from "react-dom";

import FacebookAuth from "./components/FacebookAuth";
import GoogleAuth from "./components/GoogleAuth";
import Login from "./components/Login";

/** estilo */
import "./index.css";

function App() {
  return (
    <div id="container">
      {/* <h1>Facebook Login</h1>
      <FacebookAuth />
      <hr />
      <h1>Google Login</h1>
      <GoogleAuth />
      <hr /> */}
      <h1>teste login menu</h1>
      <Login />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
