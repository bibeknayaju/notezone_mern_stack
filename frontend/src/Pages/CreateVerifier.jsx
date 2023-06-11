import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";

function CreateVerifier() {
  const [showForm, setShowForm] = useState(false);
  const [verifierName, setVerifierName] = useState("");
  const [verifierEmail, setVerifierEmail] = useState("");
  const [verifierUsername, setVerifierUsername] = useState("");
  const [verifierPassword, setVerifierPassword] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const createVerifier = (e) => {
    e.preventDefault();
    axios.post("/verifier/register", {
      verifierEmail,
      verifierName,
      verifierPassword,
      verifierUsername,
    });
  };

  return (
    <div className="">
      <NavBar />
      <div className="max-w-7xl m-auto">
        <div className="text-center flex flex-col justify-between mt-5">
          <div className="flex justify-between mb-5">
            <h1 className="font-Poppins font-semibold text-3xl">
              Verifier List
            </h1>

            <button
              onClick={toggleForm}
              className="border border-black px-5 py-2 rounded-md">
              Create New Verifier
            </button>
          </div>

          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" class="px-6 py-4">
                  S.N.
                </th>
                <th scope="col" class="px-6 py-4">
                  Name
                </th>
                <th scope="col" class="px-6 py-4">
                  Email
                </th>
                <th scope="col" class="px-6 py-4">
                  Username
                </th>
                <th scope="col" class="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td class="whitespace-nowrap px-6 py-4">Mark</td>
                <td class="whitespace-nowrap px-6 py-4">mark@gmail.com</td>
                <td class="whitespace-nowrap px-6 py-4">mark1</td>
              </tr>
            </tbody>
          </table>

          {showForm && (
            <div className="flex justify-center items-center mt-10 flex-col text-black">
              <label className="text-black font-Poppins text-lg mb-2">
                Verifier Name:
              </label>
              <input
                value={verifierName}
                onChange={(e) => setVerifierName(e.target.value)}
                className="w-96 mb-5 bg-transparent font-Poppins border-black py-2 px-4 rounded-lg text-black border outline-none"
                type="email"
                placeholder="Enter your name here..."
              />

              <label className="text-black font-Poppins text-lg mb-2">
                Email:
              </label>
              <input
                value={verifierEmail}
                onChange={(e) => setVerifierEmail(e.target.value)}
                className="w-96 mb-5 bg-transparent font-Poppins border-black py-2 px-4 rounded-lg text-black border outline-none"
                type="email"
                placeholder="Enter your email here..."
              />

              <label className="text-black font-Poppins text-lg mb-2">
                Username:
              </label>
              <input
                value={verifierUsername}
                onChange={(e) => setVerifierUsername(e.target.value)}
                className="w-96 mb-5 bg-transparent font-Poppins border-black py-2 px-4 rounded-lg text-black border outline-none"
                type="text"
                placeholder="Enter your username here..."
              />

              <label className="text-black font-Poppins text-lg mb-2">
                Password:
              </label>
              <input
                value={verifierPassword}
                onChange={(e) => setVerifierPassword(e.target.value)}
                className="w-96 mb-5 bg-transparent font-Poppins border-black py-2 px-4 rounded-lg text-black border outline-none"
                type="password"
                placeholder="Enter your password here..."
              />

              <button
                onClick={createVerifier}
                className="w-96 border border-blue-200 bg-black font-Poppins font-bold text-lg text-white hover:bg-transparent hover:text-black h-10 mt-10 rounded-xl">
                Create Verifier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateVerifier;
