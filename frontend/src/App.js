import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreateVerifier from "./Pages/CreateVerifier";
import axios from "axios";
import CreateContent from "./Pages/CreateContent";
import VerifyContent from "./Pages/VerifyContent";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path={"/create/verifier"} element={<CreateVerifier />} />
          <Route path={"/create/content"} element={<CreateContent />} />
          <Route path={"/verify/content"} element={<VerifyContent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
