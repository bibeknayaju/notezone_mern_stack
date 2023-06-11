/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

function Hero() {
  return (
    <div className="h-full max-w-7xl items-center flex flex-col m-auto">
      <div className="flex">
        <div className="flex flex-col justify-center m-auto items-start h-[50vh]">
          <h1 className="font-Poppins font-semibold text-8xl mb-5">
            A Study Material portal
          </h1>
          <p className="w-[90%] font-Montserrat font-normal text-gray-600 text-base">
            Our loan services offer a hassle-free and streamlined borrowing
            experience, providing you with the funds you need in a timely manner
            to meet your financial requirements.
          </p>
        </div>
        <div>
          <img
            className="h-full w-full object-contain"
            src={"https://pngimg.com/d/book_PNG51038.png"}
            alt={"New image"}
          />
        </div>
      </div>

      <div className="items-center my-5 text-center">
        <h2 className="text-5xl mb-4 font-Poppins text-blue-500 font-semibold">
          More Than 50 Students and 12 Instructor has contribute on this site!
        </h2>
        <p className="text-lg font-Montserrat font-semibold">
          Welcome to the note sharing network of Aadikavi Bhanubhakta Campus
        </p>
      </div>
    </div>
  );
}

export default Hero;
