import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import PdfUploader from "../Components/PdfUploader";
import { Navigate } from "react-router-dom";

function CreateContent() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  async function saveContent(e) {
    e.preventDefault();
    const contentData = {
      selectedSemester,
      title,
      pdfFile,
    };
    try {
      await axios.post("/create/content", contentData);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <NavBar />

      <div className="max-w-7xl m-auto ">
        <div className="mb-7 text-center">
          <h1 className="font-Poppins text-3xl font-semibold">
            Contribute Assets
          </h1>
        </div>

        <div className="flex flex-col">
          <div className=" flex flex-col justify-center items-center">
            <label className="mb-2 font-Poppins text-sm font-semibold">
              Title of the content
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-96 mb-5 bg-transparent font-Poppins border-black py-2 px-4 rounded-lg text-black border outline-none"
              type="text"
              placeholder="Describe the content your are contributing"
            />
          </div>

          <div className=" flex flex-col justify-center items-center">
            <label className="mb-2 font-Poppins text-sm font-semibold">
              Semester
            </label>
            <select
              onChange={handleSemesterChange}
              value={selectedSemester}
              className="border border-gray-300 rounded-md px-4 py-2">
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>

          <PdfUploader
            saveContent={saveContent}
            pdfFile={pdfFile}
            onChange={setPdfFile}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateContent;
