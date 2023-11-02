import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserId }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log("clicked?");
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        loginData
      );
      setLoginError(false);
      console.log("Login successful", response.data);
      setUserId(response.data.userId);
      console.log("hhhhhhkkldkioiopewo hsh hre");
      navigate("/chat");
    } catch (error) {
      setLoginError(true);
      console.error("Login error", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 login-col">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              {loginError && (
                <p style={{ color: "red" }}>Invalid username or password</p>
              )}
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button
                onClick={handleLogin}
                className="btn btn-primary btn-block"
              >
                Login
              </button>
              <p className="text-center">
                New User : <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <div className="row justify-content-center">
    //     <div className="col-12 col-md-6 col-lg-4">
    //       <h2 className="text-center">Login</h2>
    //       <form>
    //         <div className="form-group">
    //           <label>Username:</label>
    //           <input
    //             type="text"
    //             name="username"
    //             onChange={handleInputChange}
    //             className="form-control"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label>Password:</label>
    //           <input
    //             type="password"
    //             name="password"
    //             onChange={handleInputChange}
    //             className="form-control"
    //           />
    //         </div>
    //         <button onClick={handleLogin} className="btn btn-primary btn-block">
    //           Login
    //         </button>
    //       </form>
    //       <p className="text-center">
    //         New User : <Link to="/register">Register</Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // <div>
    //   <h2>Login</h2>
    //   <div>
    //     <label>Username:</label>
    //     <input type="text" name="username" onChange={handleInputChange} />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input type="password" name="password" onChange={handleInputChange} />
    //   </div>
    //   <button onClick={handleLogin}>Login</button>
    //   <p>New User :</p> <Link to="/register">Register</Link>
    // </div>
  );
};

export default Login;
