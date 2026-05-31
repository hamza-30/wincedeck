import React from "react";
import { useForm } from "react-hook-form";
import HeroSection from "../components/HeroSection";
import { toast } from "sonner";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import PageTransition from "../components/PageTransition";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { resetPassword, loading } = useAuthContext();

  const onSubmit = async (data) => {
    let result = await resetPassword(data.email);
    console.log(result);

    if (result.success) {
      toast.success("If an account exists, a link was sent");
    } else {
      toast.error("Unable to reset password");
    }
  };

  return (
    <div className={`flex-1 flex`}>
      <div
        className={`bg-white w-full lg:w-1/2 px-5.5 flex justify-center items-center`}
      >
        <PageTransition>
          <div className={`w-94`}>
            <div
              className={`font-mono text-[0.69rem] text-[#f97314] tracking-wider mb-1.5`}
            >
              RESET YOUR PASSWORD
            </div>
            <div className={`text-[1.8rem] font-extrabold mb-0.5`}>
              Forgot password {":("}
            </div>
            <div className={`text-gray-500 text-[0.85rem] mb-6`}>
              Get the password reset email in your mailbox.
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
              <button
                type="submit"
                disabled={loading}
                className={`bg-black w-full text-white text-[0.82rem] h-10 rounded-lg font-semibold hover:bg-[#000000d2] active:bg-[#000000d2] transition-all ease-in-out duration-150 flex justify-center items-center mt-4`}
              >
                {loading ? (
                  <span
                    className={`border-[2.3px] border-transparent border-t-white border-b-white h-4.5 w-4.5 rounded-full inline-block animate-spin`}
                  ></span>
                ) : (
                  "Send email"
                )}
              </button>
            </form>
          </div>
        </PageTransition>
      </div>

      <div className={`w-1/2 hidden lg:block`}>
        <HeroSection />
      </div>
    </div>
  );
}

export default ForgotPassword;
