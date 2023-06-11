import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";

function VerifyContent() {
  const [contents, setContents] = useState([]);
  const contentData = () => {
    axios.get("/contents").then((response) => {
      setContents(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    contentData();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="max-w-7xl m-auto">
        <div className="flex justify-between mb-5">
          <h1 className="font-Poppins font-semibold text-3xl">Content List</h1>
        </div>

        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                S.N.
              </th>
              <th scope="col" className="px-6 py-4">
                Contributor Name
              </th>
              <th scope="col" className="px-6 py-4">
                Semester
              </th>{" "}
              <th scope="col" className="px-6 py-4">
                Content Link
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => (
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4">{content.con}</td>
                <td className="whitespace-nowrap px-6 py-4">mark@gmail.com</td>
                <td className="whitespace-nowrap px-6 py-4">mark1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerifyContent;
