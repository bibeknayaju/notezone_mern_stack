import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const loginHandleButton = (e) => {
    e.preventDefault();
    axios.post("/login", { email, password });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-[100vh] flex bg-white ">
      <div className="w-[50%] flex flex-col items-center justify-center">
        <Link to={"/"}>
          <img className="h-96" src={"/assets/logo.png"} alt={"text"} />
        </Link>
        <h1 className="w-[50%] text-center font-Poppins font-medium text-xl">
          NoteZone is a dynamic and collaborative note-sharing platform that
          empowers users to effortlessly create, share, and access notes in a
          seamless online environment.
        </h1>
      </div>

      <div className="w-[50%] bg-blue-800 rounded-tl-3xl rounded-bl-3xl flex m-auto h-[100vh] justify-center">
        <div className=" my-auto">
          <form>
            <h1 className="text-center mb-10 font-Poppins text-white font-medium text-5xl">
              Welcome Back!
            </h1>
            <div className="flex flex-col">
              <label className="text-white font-Poppins text-lg mb-2">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-96 mb-5 bg-transparent font-Poppins border-white py-2 px-4 rounded-lg text-white border outline-none"
                type="email"
                placeholder="Enter your email here..."
              />

              <label className="text-white font-Poppins text-lg mb-2">
                Password:
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-96 mb-5 bg-transparent font-Poppins border-white py-2 px-4 rounded-lg text-white border outline-none"
                type="password"
                placeholder="Enter your password here..."
              />

              <button
                onClick={loginHandleButton}
                className="w-full border border-white bg-white font-Poppins font-bold text-lg text-blue-700 hover:bg-transparent hover:text-white h-10 mt-10 rounded-xl">
                Login
              </button>

              <div className="text-center mt-10">
                <h4 className="font-Poppins text-white">
                  Don't have an account?{" "}
                  <Link to={"/register"}>
                    <span className="underline">Register Here!</span>
                  </Link>
                </h4>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
