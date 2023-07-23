import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"; // Make sure you import BrowserRouter as Router
import App from './App';
import AuthProvider from "./components/AuthProvider/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
