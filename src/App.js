import React, { useState } from "react";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Chat from "./component/Chat";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Login.css";
import "./css/Footer.css";
import "./css/Header.css";
import "./css/UserList.css";
import "./css/ChatRoom.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import NotFound from "./component/NotFound";
function App() {
  const [userId, setUserId] = useState(null);
  // useEffect(() => {
  //   // Fetch user profile data when the component mounts
  //   axios
  //     .get("http://localhost:3001/auth/profile/:userId")
  //     .then((response) => console.log(response))
  //     .catch((error) => console.error("Error fetching user profile", error));
  // }, []);
  return (
    <div className="App">
      {/* Your main application component */}
      {/* <h1>Hello, Chat App!</h1> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Router>
        <div>
          <Header userId={userId} setUserId={setUserId} />
          <Routes>
            <Route path="/" element={<Login setUserId={setUserId} />} />
            {userId}
            <Route path="/register" element={<Register />} />

            <Route
              path="/chat"
              element={userId ? <Chat userId={userId} /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <Footer />
      {/* <Router>
        <Routes>
          <Route path="/" component={<Login />} />
          <Route path="/register" component={Register} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
