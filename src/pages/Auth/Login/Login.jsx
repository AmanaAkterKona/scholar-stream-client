import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

import loginImg from "../../../assets/images (1).jpg"
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        navigate(location?.state || "/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Left Side - Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 opacity-15 blur-3xl rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-slate-200 opacity-10 blur-3xl rounded-full -bottom-16 -right-16 animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 border-2 border-blue-300/30 rotate-12"></div>

        <form 
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-md bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-slate-200 relative z-10"
        >
          <h2 className="text-4xl font-extrabold text-slate-800 mb-2 text-center">Welcome Back</h2>
          <p className="text-center text-slate-600 mb-6">Please login to your account</p>

          {/* Email */}
          <label className="block mb-2 font-semibold text-slate-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition-all"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 mb-3 text-sm">Email is required</p>}

          {/* Password */}
          <label className="block mb-2 font-semibold text-slate-700">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full p-3 placeholder-slate-600 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2 transition-all"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 mb-3 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 mb-3 text-sm">Password must be at least 6 characters</p>
          )}

          <div className="mb-4"><a className="link link-hover text-indigo-600">Forgot password?</a></div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg mt-4 shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            Login
          </button>

          <p className="mt-6 text-center text-slate-600">
            New to ScholarStream?
            <Link
              className="text-indigo-600 font-semibold hover:text-indigo-700 underline ml-1 transition-colors"
              to="/register"
              state={location.state}
            >
              Register
            </Link>
          </p>

          <div className="mt-6">
            <SocialLogin />
          </div>
        </form>
      </div>

      {/* Right Side - Illustration / Info Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6 md:p-10 relative bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 opacity-20 blur-3xl rounded-full top-0 right-0 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 opacity-15 blur-3xl rounded-full bottom-0 left-0 animate-[pulse_3s_ease-in-out_infinite]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-8">
          <img 
            src={loginImg} 
            alt="Login Illustration" 
            className="w-full max-w-sm rounded-2xl shadow-2xl object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          <h3 className="text-slate-800 font-bold text-3xl md:text-4xl text-center">
            Welcome Back to
            <span className="block mt-1 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              ScholarStream
            </span>
          </h3>
          <p className="text-slate-600 text-center text-lg md:text-xl">Access your account and manage your scholarships easily</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
