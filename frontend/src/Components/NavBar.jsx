import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const currentUrl = window.location.href;

  const logout = (e) => {
    e.preventDefault();
    axios.post("/logout");
    setUser(null);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="max-w-7xl m-auto">
      <div className="py-3 flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <img
              className="h-36 w-full object-contain cursor-pointer"
              src={"/assets/logo.png"}
              alt="text"
            />
          </Link>
        </div>
        <div className="items-center gap-6 flex">
          <h4 className="text-xl font-Poppins font-semibold cursor-pointer">
            Semester
          </h4>
          <h4 className="text-xl font-Poppins font-semibold cursor-pointer">
            Blog
          </h4>
          <h4 className="text-xl font-Poppins font-semibold cursor-pointer ">
            Contribution
          </h4>
          <h4 className="text-xl font-Poppins font-semibold cursor-pointer">
            About Us
          </h4>
          {currentUrl !== "http://localhost:3000/create/verifier" &&
            user?.role === "admin" && (
              <div>
                <Link to={"/create/verifier"}>
                  <button className="border border-black transition-all hover:bg-white hover:text-black font-Plus_Jakarta_Sans bg-blue-600 text-white px-6 rounded-md py-3">
                    Create Verifier
                  </button>
                </Link>
              </div>
            )}
          {currentUrl !== "http://localhost:3000/verify/content" &&
            user?.role === "verifier" && (
              <div>
                <Link to={"/verify/content"}>
                  <button className="border border-black transition-all hover:bg-white hover:text-black font-Plus_Jakarta_Sans bg-blue-600 text-white px-6 rounded-md py-3">
                    Verify Content
                  </button>
                </Link>
              </div>
            )}

          {currentUrl !== "http://localhost:3000/create/content" &&
            user?.role === "contributor" && (
              <div>
                <Link to={"/create/content"}>
                  <button className="border border-black transition-all hover:bg-white hover:text-black font-Plus_Jakarta_Sans bg-blue-600 text-white px-6 rounded-md py-3">
                    Contribute Content
                  </button>
                </Link>
              </div>
            )}

          {user ? (
            <div>
              <button onClick={logout}>
                <span className="border border-black transition-all hover:bg-white hover:text-black font-Plus_Jakarta_Sans bg-black text-white px-6 rounded-md py-3">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <>
              <div>
                <Link to={"/login"}>
                  <button className="border border-black transition-all hover:bg-white hover:text-black font-Plus_Jakarta_Sans bg-black text-white px-6 rounded-md py-3">
                    Account
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
