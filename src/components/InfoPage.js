import React from "react";

const InfoPage = () => {
  const userEmail = localStorage.getItem("userEmail");
  const userPassword = "*************";
  
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">User Info</h2>
      <h3 className="text-gray-500">Email - <span className="text-orange-500 font-black">{userEmail}</span></h3>
      <h3 className="text-gray-500">Password - <span className="text-orange-500 font-black">{userPassword}</span></h3>
    </div>
  );
};

export default InfoPage;
