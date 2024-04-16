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

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });
      console.log(res);
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-[#fff] rounded-xl overflow-hidden shadow-xl">
        {/* RIGHT*/}
        <div className="bg-[#f8f7ff] w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center ">
          <p className="text-ascent-3 text-base font-semibold">
            Create Your Account
          </p>
          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Name */}
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                type="text"
                styles="w-full"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />
              {/* Last Name */}
              <TextInput
                name="Last Name"
                label="Last Name"
                placeholder="Last Name"
                type="lastName"
                styles="w-full"
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>
            {/* For email */}
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full"
              error={errors.email ? errors.email.message : ""}
            />
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              {/* For Password */}
              <TextInput
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                styles="w-full "
                labelStyle="ml-2"
                error={errors.password ? errors.password.message : ""}
              />
              {/* Confirm Password */}
              <TextInput
                placeholder="Password"
                label="Confirm Password"
                type="password"
                styles="w-full "
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    if (password !== value) {
                      return "Passwords do not match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword.message
                    : ""
                }
              />
            </div>

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
                title="Create Account"
              />
            )}
          </form>
          <p className="" text-ascent-2 text-sm text-center>
            Already have an Account?{""}
            <Link
              to="/login"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
        {/* lEFT */}

        {/* <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#7b2cbf] relative">
          <div className="w-3/4 md:w-2/3 lg:w-full h-3/4 md:h-2/3 lg:h-full flex justify-center items-center mx-auto my-8 lg:my-0">
            <img
              src={BgImage}
              alt="Bg-Img"
              className="w-full h-full object-cover rounded-lg"
            />
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

export default Register;
