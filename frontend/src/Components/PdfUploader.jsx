import React, { useState } from "react";
import axios from "axios";

function PdfUploader({ pdfFile, onChange, saveContent }) {
  const [preview, setPreview] = useState(null);
  const [done, setDone] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPreview(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDone(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }

    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("pdfFile", files[i]);
    }

    axios
      .post("/upload/pdf", data, {
        headers: {
          "Content-type": "mutipart/form-data",
        },
      })
      .then((response) => {
        const { data: fileNames } = response;
        onChange((prev) => {
          return [...prev, ...fileNames];
        });
      });
  };

  return (
    <>
      <div className=" flex flex-col mt-4 justify-center items-center">
        <label className="border bg-blue-600 px-5 py-3 rounded-lg text-white flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new file
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf"
          />
        </label>
      </div>
      {done && (
        <>
          <div className="flex items-center justify-center flex-col mt-6 mb-10">
            <h3 className="font-Poppins text-xl font-light mb-3">Preview</h3>
            <embed src={done} width="600" height="600" type="application/pdf" />
          </div>

          <div className="my-5 items-center justify-center flex">
            <button
              onClick={saveContent}
              className="bg-blue-600 text-white border rounded-md px-5 py-2">
              Contribute
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default PdfUploader;
