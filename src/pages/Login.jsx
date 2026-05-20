import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import HeroSection from "../components/HeroSection";

function Login() {
  const [seePassword, setSeePassword] = useState(false);
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    console.log(result);
  };

  return (
    <div className={`flex-1 flex`}>
      <div
        className={`bg-white w-full lg:w-1/2 px-5.5 flex justify-center items-center`}
      >
        <div className={`w-94`}>
          <div
            className={`font-mono text-[0.69rem] text-[#f97314] tracking-wider mb-1.5`}
          >
            LOG IN TO YOUR ACCOUNT
          </div>
          <div className={`text-[1.8rem] font-extrabold mb-0.5`}>
            Welcome back
          </div>
          <div className={`text-gray-500 text-[0.85rem] mb-6`}>
            Pick up where the last exception left off.
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="emailInput"
              className={`text-[10px] text-gray-500 font-semibold block mb-1.5`}
            >
              YOUR EMAIL
            </label>
            <input
              id="emailInput"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@domain.com"
              className={`w-full h-10 outline-none border border-gray-300 rounded-lg focus:border-transparent focus:ring focus:ring-[#f97314] transition-discrete ease-in-out duration-200 font-mono text-sm pl-3 mb-1`}
            />
            <span className="text-red-500 text-[10px] block">
              {errors.email?.message}
            </span>
            <label
              htmlFor="passwordInput"
              className={`text-[10px] text-gray-500 font-semibold block mt-3 mb-1.5`}
            >
              PASSWORD
            </label>
            <div className={`mb-1 relative`}>
              <input
                id="passwordInput"
                type={seePassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be minimum 8 characters",
                  },
                })}
                placeholder="•••••••••••"
                className={`w-full h-10 outline-none border border-gray-300 rounded-lg focus:border-transparent focus:ring focus:ring-[#f97314] transition-discrete ease-in-out duration-200 font-mono text-sm pl-3 pr-7`}
              />

              {seePassword && (
                <IoEyeOutline
                  className={`absolute text-lg right-2 bottom-3 text-gray-600`}
                  onClick={() => setSeePassword(!seePassword)}
                />
              )}
              {!seePassword && (
                <IoEyeOffOutline
                  className={`absolute text-lg right-2 bottom-3 text-gray-600`}
                  onClick={() => setSeePassword(!seePassword)}
                />
              )}
            </div>
            <span className="text-red-500 text-[10px] block">
              {errors.password?.message}
            </span>
            <div className={`mt-1.5 mb-4 text-right`}>
              <span
                className={`text-[11px] text-gray-500 text-right font-semibold cursor-pointer hover:text-black active:text-black`}
              >
                Forgot password?
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-black w-full text-white text-[0.82rem] h-10 rounded-lg font-semibold hover:bg-[#000000d2] active:bg-[#000000d2] transition-all ease-in-out duration-150 flex justify-center items-center`}
            >
              {loading ? (
                <span
                  className={`border-[2.3px] border-transparent border-t-white border-b-white h-4.5 w-4.5 rounded-full inline-block animate-spin`}
                ></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className={`text-[12px] flex gap-x-1 mt-4 items-center`}>
            <span className={`text-gray-500`}>Don't have an account?</span>
            <Link
              to={"/signup"}
              className={`flex items-center gap-x-0.5 hover:text-[#f97314] active:text-[#f97314]`}
            >
              <span className={`font-semibold`}>Sign Up</span>
              <MdArrowRightAlt className={`mb-[0.6px]`} />
            </Link>
          </div>
        </div>
      </div>

      <div className={`w-1/2 hidden lg:block`}>
        <HeroSection />
      </div>
    </div>
  );
}

export default Login;
