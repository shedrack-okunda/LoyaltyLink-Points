import React from "react";

export const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-4 px-4 fixed w-full top-0 z-10 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-gift p-2 rounded-full hover:bg-white/20  text-2xl"></i>
          Loyalty Points
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
            <i className="fas fa-bell text-2xl"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
            <i className="fas fa-user-circle text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
