import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import loginImg2 from "../../../assets/logimg.jpg"
import loginImg from "../../../assets/images (1).jpg"

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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

  // Auto-fill demo credentials
  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setValue('email', 'santi@gmail.com');
      setValue('password', 'Scholar@123');
    } else if (role === 'student') {
      setValue('email', 'Arhan@nazar.com');
      setValue('password', '123Oo@78');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#033044] via-[#044a66] to-[#055a7a] relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute w-[500px] h-[500px] bg-[#37c4ef]/20 blur-[120px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#37c4ef]/15 blur-[100px] rounded-full bottom-[-80px] right-[-80px] animate-[pulse_4s_ease-in-out_infinite]"></div>
      <div className="absolute w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full top-1/2 left-1/2 animate-[pulse_5s_ease-in-out_infinite]"></div>

      {/* Left Side - Image with Glossy Overlay */}
      <div className="flex w-full md:w-1/2 relative overflow-hidden">
        {/* Background Image - loginImg2 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginImg2})` }}
        />
        
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#033044]/90 via-[#033044]/70 to-transparent backdrop-blur-[2px]"></div>
        
        {/* Glass Effect Layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10"></div>

        {/* Content Over Image */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-12 text-white">
          {/* Logo/Brand Section */}
          <div className="mb-8 backdrop-blur-xl bg-white/10 p-6 rounded-3xl border border-white/20 shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-[0_0_30px_rgba(55,196,239,0.8)]">
              Scholar<span className="text-[#37c4ef]">Stream</span>
            </h1>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4 w-full max-w-md">
            <div className="backdrop-blur-xl bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all">
              <h3 className="text-xl font-bold text-[#37c4ef] mb-2">🎓 Smart Matching</h3>
              <p className="text-sm text-white/80">AI-powered scholarship matching based on your profile</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all">
              <h3 className="text-xl font-bold text-[#37c4ef] mb-2">💰 $2.5M+ Available</h3>
              <p className="text-sm text-white/80">Access thousands of verified scholarship opportunities</p>
            </div>

            <div className="backdrop-blur-xl bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all">
              <h3 className="text-xl font-bold text-[#37c4ef] mb-2">✨ 100% Free</h3>
              <p className="text-sm text-white/80">No hidden fees, completely free for students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 relative overflow-hidden">
        
        {/* Background Image behind form - halka */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${loginImg})` }}
        />
        <div className="absolute inset-0 bg-[#033044]/50 backdrop-blur-[1px]"></div>
        
        <form 
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-md backdrop-blur-2xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 relative z-10"
        >
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h2>
            <p className="text-white/70">Sign in to continue your scholarship journey</p>
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-white/90 text-sm uppercase tracking-wider">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-4 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#37c4ef] focus:border-[#37c4ef] transition-all shadow-lg"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-[#37c4ef] mt-2 text-sm font-medium">⚠ Email is required</p>}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="block mb-2 font-semibold text-white/90 text-sm uppercase tracking-wider">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full p-4 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#37c4ef] focus:border-[#37c4ef] transition-all shadow-lg"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-[#37c4ef] mt-2 text-sm font-medium">⚠ Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-[#37c4ef] mt-2 text-sm font-medium">⚠ Password must be at least 6 characters</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="mb-6 text-right">
            <a className="text-[#37c4ef] hover:text-[#37c4ef]/80 text-sm font-semibold cursor-pointer transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-gradient-to-r from-[#37c4ef] to-[#1faed1] hover:from-[#1faed1] hover:to-[#37c4ef] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#37c4ef]/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[#37c4ef]/50">
            Sign In
          </button>

          {/* Demo Login Buttons */}
          <div className="mt-4 space-y-2">
            <p className="text-center text-white/60 text-xs uppercase tracking-wider mb-2">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="backdrop-blur-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
              >
                👨‍💼 Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="backdrop-blur-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
              >
                🎓 Student
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-center text-white/80">
            New to ScholarStream?
            <Link
              className="text-[#37c4ef] font-bold hover:text-[#37c4ef]/80 ml-2 transition-colors"
              to="/register"
              state={location.state}
            >
              Create Account →
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/60 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;