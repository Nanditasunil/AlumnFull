import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage, Logo, LogoImage } from "../assets";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImCamera } from "react-icons/im";
import { apiRequest } from "../utils";
import { UserLogin } from "../redux/userSlice";
const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg("");
        const newData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-100 md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-[#fff] rounded-xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div className="bg-[#f8f7ff] w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center ">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 rounded text-white w-50">
              {/* <ImCamera /> */}
              <img src={LogoImage} alt="img" className="rounded " />
            </div>
          </div>
          <p className="text-ascent-4 text-[#000] font-semibold">
            Log in to your Account
          </p>
          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* For email */}
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              // hooks
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full rounded-full text-fuchsia-700"
              labelStyle="ml-2"
              error={errors.email ? errors.email.message : ""}
            />
            {/* For Password */}
            <TextInput
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              // hook
              register={register("password", {
                required: "Password is required",
              })}
              styles="w-full rounded-full"
              labelStyle="ml-2"
              error={errors.password ? errors.password.message : ""}
            />
            <Link
              to="/reset-password"
              className="text-sm text-right text-[#3c096c] font-semibold"
            >
              Forgot Password?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-[#3c096c] px-8 py-3 text-sm font-meduium text-white outline-none`}
                title="Login"
              />
            )}
          </form>
          <p className="text-ascent-2 text-sm text-center">
            Dont Have an Account?
            <Link
              to="/register"
              className="text-[#065ad8] font-semibold ml-2 curson-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        {/* <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#7b2cbf]">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImage}
              alt="Bg-Img"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />
          </div>
          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Where the Future meets the past
            </p>
            <span className="text-sm text-white/80">
              Share and something something 
            </span>
          </div>
        </div> */}

        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#7b2cbf] relative">
          <div className="w-3/4 md:w-2/3 lg:w-full h-3/4 md:h-2/3 lg:h-full flex justify-center items-center mx-auto my-8 lg:my-0">
            <img
              src={BgImage}
              alt="Bg-Img"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
