
import React from 'react';
import errorImg from '../../assets/error404.avif'; 

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5fdff] text-center px-4">
      <img src={errorImg} alt="404 Error" className="w-80 md:w-96 mb-8" />
      <h1 className="text-5xl font-bold text-[#033044] mb-4">Oops!</h1>
      <p className="text-xl text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-[#37c4ef] text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Error404;
