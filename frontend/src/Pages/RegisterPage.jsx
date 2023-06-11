import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const registerHandle = (e) => {
    e.preventDefault();
    try {
      axios.post("/contributor/register", {
        fullName,
        username,
        email,
        password,
      });
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="h-[100vh] flex bg-white ">
      <div className="w-[50%] bg-blue-800  rounded-tr-3xl rounded-br-3xl flex m-auto h-[100vh] justify-center">
        <div className=" my-auto px-32">
          <form>
            <h1 className="text-center mb-10 font-Poppins text-white font-medium text-4xl">
              Register Here!
            </h1>
            <div className="flex flex-col">
              <label className="text-white font-Poppins text-lg mb-2">
                Full Name:
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mb-5 bg-transparent font-Poppins border-white py-2 px-4 rounded-lg text-white border outline-none"
                type="text"
                placeholder="Enter your email here..."
              />

              <label className="text-white font-Poppins text-lg mb-2">
                Username:
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-5 bg-transparent font-Poppins border-white py-2 px-4 rounded-lg text-white border outline-none"
                type="text"
                placeholder="Enter your email here..."
              />

              <label className="text-white font-Poppins text-lg mb-2">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-5 bg-transparent font-Poppins border-white py-2 px-4 rounded-lg text-white border outline-none"
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
                onClick={registerHandle}
                className="w-full border border-white bg-white font-Poppins font-bold text-lg text-blue-700 hover:bg-transparent hover:text-white h-10 mt-10 rounded-xl">
                Register Now
              </button>

              <div className="text-center mt-10">
                <h4 className="font-Poppins text-white">
                  Already have an account?{" "}
                  <Link to={"/login"}>
                    <span className="underline">Login Here!</span>
                  </Link>
                </h4>
              </div>
            </div>
          </form>
        </div>
      </div>

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
    </div>
  );
}

export default RegisterPage;
