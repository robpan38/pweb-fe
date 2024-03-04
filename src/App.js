import { useState } from 'react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loggedIn ? <Navigate to="content" /> : <Navigate to="signup" />}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
