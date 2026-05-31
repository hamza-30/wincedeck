import React from "react";
import { Link } from "react-router-dom";
import DashboardPreview from "../components/DashboardPreview";

function LandingPage() {
  return (
    <div
      className={`flex-1 mx-auto px-5.5 max-w-7xl w-full overflow-x-hidden`}
    >
      <div
        className={`mt-30 whitespace-pre-line w-full  md:w-[80%] lg:w-[60%]`}
      >
        <h1
          className={`text-[3rem] lg:text-[4.5rem] font-extrabold leading-13 lg:leading-18 mb-7 tracking-tight`}
        >
          Know when{`\n`} your app breaks. Before your{" "}
          <span className={`text-[#f97314]`}>users</span> tell you.
        </h1>
        <p className={`text-gray-500 mb-11 text-lg`}>
          WinceDeck is a real-time error monitor for modern web stacks. No bulky
          SDKs, no build step; just one script tag and instant technical
          clarity.
        </p>
        <Link
          to={"/signup"}
          className={`bg-gray-950 hover:bg-[#070707d2] text-white py-3.5 px-7.5 rounded-lg text-sm font-bold shadow-lg`}
        >
          Get Started
        </Link>
      </div>

      <DashboardPreview />
    </div>
  );
}

export default LandingPage;
