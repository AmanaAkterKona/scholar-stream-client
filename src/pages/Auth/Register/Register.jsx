import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import scholarImg2 from "../../../assets/images (1).jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecute";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

 const handleRegistration = (data) => {
  const profileImg = data.photo[0];

  registerUser(data.email, data.password)
    .then(() => {
      // 1. Image upload to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      axios.post(image_API_URL, formData).then((res) => {
        const photoURL = res.data.data.url;

        // 2. Save user in database
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("User Saved in Database");
          }
        });

        // 3. Update firebase profile
        updateUserProfile({
          displayName: data.name,
          photoURL: photoURL,
        })
          .then(() => {

            // 🟢 SweetAlert Success Popup
            Swal.fire({
              title: "Registration Successful!",
              text: "Your account has been created successfully.",
              icon: "success",
              confirmButtonColor: "#4f46e5",
              confirmButtonText: "Go to Home",
            }).then(() => {
              navigate("/");
            });

          })
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => console.log(error));
};

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Left Side - Premium Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 relative overflow-hidden">
        
        {/* Background Design for Form Section */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}>
          </div>
        </div>

        <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 opacity-15 blur-3xl rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-slate-200 opacity-10 blur-3xl rounded-full -bottom-16 -right-16 animate-[pulse_3s_ease-in-out_infinite]"></div>
        
        <div className="absolute top-16 right-16 w-32 h-32 border-2 border-indigo-300/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute bottom-24 left-16 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-lg rotate-45 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 border-2 border-blue-300/30 rotate-12"></div>

        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }}>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="w-full max-w-md bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-slate-200 relative z-10"
        >
          <h2 className="text-4xl font-extrabold text-slate-800 mb-6 text-center">
            Welcome to Scholar Stream
          </h2>
          <p className="text-center text-slate-600 mb-8">Create your account</p>

          {/* Name */}
          <label className="block mb-2 font-semibold text-slate-700">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-3 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition-all"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 -mt-3 mb-3 text-sm">Name is required</p>}

          {/* Photo */}
          <label className="block mb-2 font-semibold text-slate-700">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="w-full p-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
          />
          {errors.photo && <p className="text-red-500 -mt-3 mb-3 text-sm">Photo is required</p>}

          {/* Email */}
          <label className="block mb-2 placeholder-slate-600 font-semibold text-slate-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition-all"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 -mt-3 mb-3 text-sm">Email is required</p>}

          {/* Password */}
          <label className="block mb-2 font-semibold text-slate-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            className="w-full p-3 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2 transition-all"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 mb-3 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 mb-3 text-sm">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 mb-3 text-sm">
              Must include uppercase, lowercase, number & special character
            </p>
          )}

          <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg mt-4 shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            Register
          </button>

          <p className="mt-6 text-center text-slate-600">
            Already have an account?
            <Link
              className="text-indigo-600 font-semibold hover:text-indigo-700 underline ml-1 transition-colors"
              to="/login"
              state={location.state}
            >
              Login
            </Link>
          </p>

          <div className="mt-6">
            <SocialLogin />
          </div>
        </form>
      </div>

      {/* Right Side - Modern Professional Section with Full Background Design */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6 md:p-10 relative bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 overflow-hidden">

        {/* Animated Background Pattern - Full Coverage */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}>
          </div>
        </div>

        {/* Large Gradient Orbs - Full Section */}
        <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 opacity-20 blur-3xl rounded-full top-0 right-0 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 opacity-15 blur-3xl rounded-full bottom-0 left-0 animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-br from-slate-200 to-blue-100 opacity-25 blur-2xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[pulse_4s_ease-in-out_infinite]"></div>

        {/* Floating Geometric Shapes - More Coverage */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-indigo-300/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute top-20 right-20 w-40 h-40 border-2 border-blue-300/20 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-lg rotate-45 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 border-2 border-blue-300/40 rotate-12 animate-[spin_15s_linear_infinite]"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full animate-[pulse_5s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-indigo-300/30 rounded-lg rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-14 h-14 border-2 border-blue-300/25 rounded-full"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }}>
          </div>
        </div>

        {/* Diagonal Lines Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #4f46e5 0px, #4f46e5 2px, transparent 2px, transparent 10px)`,
              }}>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-8">
          
          {/* Icon/Logo Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center space-y-4 max-w-lg px-6">
            <h3 className="text-slate-800 font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Welcome to
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                ScholarStream
              </span>
            </h3>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-600"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-600"></div>
            </div>

            <p className="text-slate-600 text-lg md:text-xl font-medium">
              Empowering students to achieve academic excellence
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-md px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-indigo-100/50">
              <div className="text-indigo-600 text-2xl font-bold mb-1">500+</div>
              <div className="text-slate-600 text-xs">Scholarships</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100/50">
              <div className="text-blue-600 text-2xl font-bold mb-1">10K+</div>
              <div className="text-slate-600 text-xs">Students</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-indigo-100/50">
              <div className="text-indigo-600 text-2xl font-bold mb-1">98%</div>
              <div className="text-slate-600 text-xs">Success Rate</div>
            </div>
          </div>

          {/* Image with Modern Card Design */}
          <div className="relative w-full max-w-md px-6">
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>
              
              {/* Image Container */}
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <img
                  src={scholarImg2}
                  alt="Scholarship Illustration"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Trusted</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Fast</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;