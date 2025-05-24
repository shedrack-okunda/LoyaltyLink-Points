// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative">
      {/* Nav Bar */}
      <Navbar />

      {/* Main Content */}
      <Home />
    </div>
  );
};

export default App;
