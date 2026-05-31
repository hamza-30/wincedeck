import React from "react";
import { Link } from "react-router-dom";
import DashboardPreview from "../components/DashboardPreview";
import { GoPulse } from "react-icons/go";
import { PiStackLight } from "react-icons/pi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { PiLightning } from "react-icons/pi";
import { MdOutlineArrowRightAlt } from "react-icons/md";

function LandingPage() {
  return (
    <div className={`flex-1 mx-auto px-5.5 max-w-7xl w-full overflow-x-hidden`}>
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

      <div className={`mt-30`}>
        <div
          className={`font-mono text-[#f97314] text-[11.5px] tracking-widest mb-2`}
        >
          WORKFLOW
        </div>
        <div className={`text-[2rem] font-bold tracking-tight`}>
          From zero to monitoring in 60 seconds.
        </div>

        <div
          className={`flex flex-col md:flex-row mt-10 border rounded-xl border-gray-300 mb-10`}
        >
          {[
            {
              step: "STEP 01",
              title: "Create a project",
              desc: "Spin up a project from your dashboard. We mint you a unique tracker ID instantly.",
            },
            {
              step: "STEP 02",
              title: "Add one script tag",
              desc: "Drop the snippet into your <head>. No npm install, no build pipeline, no source maps.",
            },
            {
              step: "STEP 03",
              title: "See errors in real time",
              desc: "Watch exceptions stream in live with full stack traces, page URLs, and frequency.",
            },
          ].map((card, index) => (
            <div
              className={`flex flex-col px-8 py-10 border-gray-300 md:nth-2:border-r md:nth-2:border-l nth-2:border-t nth-2:border-b
                md:nth-2:border-t-0 md:nth-2:border-b-0`}
              key={index}
            >
              <span
                className={`text-[11px] font-mono text-[#f97314] font-medium`}
              >
                {card.step}
              </span>
              <span className={`text-lg font-bold mt-5`}>{card.title}</span>
              <span className={`text-sm mt-3 text-gray-500`}>{card.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-30`}>
        <div
          className={`font-mono text-[#f97314] text-[11.5px] tracking-widest mb-2`}
        >
          WHAT'S INSIDE
        </div>
        <div className={`text-[2rem] font-bold tracking-tight`}>
          Everything you need to ship without fear.
        </div>

        <div
          className={`flex flex-col md:flex-row mt-10 border-gray-300 gap-x-5 gap-y-5`}
        >
          {[
            {
              icon: GoPulse,
              title: "Real-time capture",
              desc: "Errors are synchronized to your dashboard in real time.",
            },
            {
              icon: PiStackLight,
              title: "Stack trace details",
              desc: "Every exception ships with a full stack trace, file path, user URL context.",
            },
            {
              icon: HiOutlineChartSquareBar,
              title: "Frequency charts",
              desc: "Spot outages instantly with 24-hour error frequency, affected pages, and trend analysis.",
            },
            {
              icon: PiLightning,
              title: "Zero configuration",
              desc: "Drop in a single script tag. No SDK to install, no source maps to upload, no build step.",
            },
          ].map((card, index) => (
            <div
              className={`flex flex-col p-6 flex-1 border border-gray-300 rounded-xl`}
              key={index}
            >
              <span
                className={`text-[11px] font-mono bg-black w-fit p-2.5 rounded-lg text-[#f97314] font-medium`}
              >
                <card.icon className={`text-[1.2rem]`} />
              </span>
              <span className={`font-bold mt-5`}>{card.title}</span>
              <span className={`text-xs mt-3 text-gray-500`}>{card.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`mt-30 bg-black py-10 w-full mb-20 rounded-2xl flex justify-center items-center`}
      >
        <div
          className={`w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col gap-y-10 items-center justify-center`}
        >
          <div className={`text-white text-5xl font-bold text-center`}>
            Stop guessing why your app is broken.
          </div>
          <Link
            to={"/signup"}
            className={`bg-[#f97314] flex gap-x-1.5 items-center text-sm text-white font-bold px-5 py-3 rounded-lg group`}
          >
            <span>Deploy Monitor</span>
            <MdOutlineArrowRightAlt
              className={`text-lg group-hover:translate-x-2 transition-transform ease-in-out duration-150`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
