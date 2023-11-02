import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState(false);

  const handleInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        registerData
      );
      console.log("Registration successful", response.data);
      navigate("/");
    } catch (error) {
      setRegisterError(true);
      console.error("Registration error", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 login-col">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="text-center">Register</h2>
              {registerError && (
                <p style={{ color: "red" }}>Person already exists</p>
              )}
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <button
                onClick={handleRegister}
                className="btn btn-primary btn-block"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
