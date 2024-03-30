import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function App() {
  const AUTH_URL = "http://localhost:8080/api/v1/auth";

  const [loggedIn, setLoggedIn] = useState(false);

  const logInCallback = (name, email, password, login) => {
    if (login && (email === undefined || password === undefined)) {
      return;
    }

    if (!login && (name === undefined || email === undefined || password === undefined)) {
      return;
    }

    const url = login ? AUTH_URL + "/signin" : AUTH_URL + "/signup"
    const payload = login ? {
      "email": email,
      "password": password
    } : {
      "firstName": name,
      "email": email,
      "password": password
    };

    axios.post(url, payload)
      .then(authResponse => {
        if (login) {
          axios.defaults.headers.common = {
            'Authorization': `Bearer ${authResponse.data.token}`
          };
          setLoggedIn(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const logOutCallback = () => {
    axios.defaults.headers.common = {
      'Authorization': ''
    };
    setLoggedIn(false);
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loggedIn ? <Navigate to="content" /> : <Navigate to="signup" />}
      <Outlet context={[logInCallback, logOutCallback]} ></Outlet>
    </div>
  );
}

export default App;
