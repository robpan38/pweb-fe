import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function App() {
  const BASE_URL = "http://localhost:8080/api/v1";

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      axios.defaults.headers.common = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      };
      setLoggedIn(true);
    }
  }, [])

  useEffect(() => {
    if (loggedIn === true) {
      const jwt = localStorage.getItem("token");
      const username = jwtDecode(jwt).sub;
      axios.get(BASE_URL + "/user/" + username)
        .then(response => {
          setRole(response.data);
        })
        .catch(console.log);
    } else {
      setRole("");
    }
  }, [loggedIn])

  const logInCallback = (name, email, password, login) => {
    if (login && (email === undefined || password === undefined)) {
      return;
    }

    if (!login && (name === undefined || email === undefined || password === undefined)) {
      return;
    }

    const url = login ? BASE_URL + "/auth/signin" : BASE_URL + "/auth/signup"
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
          localStorage.setItem("token", authResponse.data.token);
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
    localStorage.clear();
    setLoggedIn(false);
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loggedIn ? <Navigate to="content" /> : <Navigate to="signup" />}
      <Outlet context={[role, logInCallback, logOutCallback]} ></Outlet>
    </div>
  );
}

export default App;
