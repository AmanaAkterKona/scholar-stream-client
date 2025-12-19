import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import scholarImg2 from "../../../assets/images (1).jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
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

  const handleRegistration = async (data) => {
    const profileImg = data.photo[0];

    if (!profileImg) {
      Swal.fire("Error", "Please select a photo", "error");
      return;
    }

    // ✅ FIX 1: File size check (ImgBB max 32MB)
    if (profileImg.size > 32 * 1024 * 1024) {
      Swal.fire("Error", "Image size must be less than 32MB", "error");
      return;
    }

    // ✅ FIX 2: File type check
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(profileImg.type)) {
      Swal.fire("Error", "Please upload a valid image (JPG, PNG, GIF, WEBP)", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", profileImg);

    // ✅ FIX 3: .env variable check
    const imageHostKey = import.meta.env.VITE_image_host_key;
    
    if (!imageHostKey) {
      console.error("❌ ImgBB API key missing in .env file");
      Swal.fire("Error", "Image upload configuration error. Contact admin.", "error");
      return;
    }

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    // ✅ FIX 4: Loading state
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while we upload your image',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // ✅ FIX 5: Better error handling for ImgBB
      const res = await axios.post(image_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("✅ ImgBB Response:", res.data);

      if (res.data.success) {
        // ✅ Get image URL from ImgBB response
        const photoURL = res.data.data.display_url || res.data.data.url;

        console.log("✅ Image uploaded successfully:", photoURL);

        // Firebase registration
        const result = await registerUser(data.email, data.password);
        
        // Firebase profile update
        await updateUserProfile({
          displayName: data.name,
          photoURL: photoURL,
        });

        // MongoDB save
        const userInfo = {
          name: data.name,
          email: data.email,
          image: photoURL,
          role: "student",
        };

        const dbRes = await axiosSecure.post("/users", userInfo);

        if (dbRes.data.insertedId || dbRes.data.message === "User already exists") {
          Swal.fire({
            title: "Success!",
            text: "Registration Successful!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate(location?.state || "/");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("❌ Full Error:", err);
      console.error("Error Response:", err.response?.data);
      
      // ✅ FIX 7: Better error messages
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response?.status === 400) {
        errorMessage = "Invalid image or API key. Please check your image and try again.";
      } else if (err.response?.status === 403) {
        errorMessage = "API key expired or invalid. Contact administrator.";
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = "Network error. Check your internet connection.";
      } else if (err.response?.data?.error?.message) {
        errorMessage = err.response.data.error.message;
      }
      
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        footer: `<small>Error Code: ${err.response?.status || 'Unknown'}</small>`
      });
    }
  };


  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Left Side - Premium Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 relative overflow-hidden">
        {/* Background Design for Form Section */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 opacity-15 blur-3xl rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-slate-200 opacity-10 blur-3xl rounded-full -bottom-16 -right-16 animate-[pulse_3s_ease-in-out_infinite]"></div>

        <div className="absolute top-16 right-16 w-32 h-32 border-2 border-indigo-300/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute bottom-24 left-16 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-lg rotate-45 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 border-2 border-blue-300/30 rotate-12"></div>

        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
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
          <label className="block mb-2 font-semibold text-slate-700">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-3 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition-all"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 -mt-3 mb-3 text-sm">Name is required</p>
          )}

          {/* Photo */}
          <label className="block mb-2 font-semibold text-slate-700">
            Photo
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            {...register("photo", { required: true })}
            className="w-full p-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
          />
          {errors.photo && (
            <p className="text-red-500 -mt-3 mb-3 text-sm">Photo is required</p>
          )}

          {/* Email */}
          <label className="block mb-2 placeholder-slate-600 font-semibold text-slate-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg text-gray-700 placeholder-slate-400 border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition-all"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 -mt-3 mb-3 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="block mb-2 font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
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

      {/* Right Side - Modern Professional Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6 md:p-10 relative bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 overflow-hidden">
        {/* [Rest of your right side code remains same] */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 opacity-20 blur-3xl rounded-full top-0 right-0 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 opacity-15 blur-3xl rounded-full bottom-0 left-0 animate-[pulse_3s_ease-in-out_infinite]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <svg
                className="w-16 h-16 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-4 max-w-lg px-6">
            <h3 className="text-slate-800 font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Welcome to
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                ScholarStream
              </span>
            </h3>

            <p className="text-slate-600 text-lg md:text-xl font-medium">
              Empowering students to achieve academic excellence
            </p>
          </div>

          <div className="relative w-full max-w-md px-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <img
                  src={scholarImg2}
                  alt="Scholarship Illustration"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;