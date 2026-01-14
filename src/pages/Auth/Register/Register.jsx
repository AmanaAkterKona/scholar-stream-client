import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import scholarImg2 from "../../../assets/images (1).jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import register1 from "../../../assets/logimg.jpg"

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

  // Validation
  if (profileImg.size > 32 * 1024 * 1024) {
    Swal.fire("Error", "Image must be less than 32MB", "error");
    return;
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(profileImg.type)) {
    Swal.fire("Error", "Please upload a valid image", "error");
    return;
  }

  // Show loading
  Swal.fire({
    title: 'Uploading Image...',
    text: 'Please wait',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    // ✅ CRITICAL FIX: Use Fetch instead of Axios
    const formData = new FormData();
    formData.append('image', profileImg);

    const API_KEY = import.meta.env.VITE_image_host_key;
    
    console.log("🔑 API Key:", API_KEY ? "Found" : "Missing");
    console.log("📤 Uploading:", profileImg.name, "-", (profileImg.size / 1024).toFixed(2), "KB");

    // ❌ DON'T USE AXIOS - causes issues with FormData
    // const res = await axios.post(url, formData);
    
    // ✅ USE FETCH instead
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: 'POST',
        body: formData
        // DON'T set Content-Type header - browser will set it automatically with boundary
      }
    );

    const result = await response.json();
    
    console.log("📥 Status:", response.status);
    console.log("📥 Response:", result);

    if (!response.ok || !result.success) {
      console.error("❌ Upload failed:", result.error);
      throw new Error(result.error?.message || "Upload failed");
    }

    const photoURL = result.data.display_url || result.data.url;
    console.log("✅ Image uploaded successfully!");
    console.log("🖼️ URL:", photoURL);

    // Continue with Firebase
    const firebaseResult = await registerUser(data.email, data.password);
    
    await updateUserProfile({
      displayName: data.name,
      photoURL: photoURL,
    });

    // Save to MongoDB
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

  } catch (err) {
    console.error("❌ Full Error:", err);
    
    let errorMessage = "Registration failed. Please try again.";
    
    if (err.message.includes("API key")) {
      errorMessage = "Invalid API key. Please check your configuration.";
    } else if (err.message.includes("network") || err.message.includes("Failed to fetch")) {
      errorMessage = "Network error. Please check your internet connection.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage
    });
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
        {/* Background Image - register1 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${register1})` }}
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
              <h3 className="text-xl font-bold text-[#37c4ef] mb-2">🚀 Quick Start</h3>
              <p className="text-sm text-white/80">Create your account in under 2 minutes</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all">
              <h3 className="text-xl font-bold text-[#37c4ef] mb-2">🎯 Personalized Matches</h3>
              <p className="text-sm text-white/80">Get scholarships tailored to your profile</p>
            </div>

            <div className="backdrop-blur-xl bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all">
              <h3 className="text-xl font-bold text-[#37c4ef] mb-2">🔒 Secure & Private</h3>
              <p className="text-sm text-white/80">Your data is protected with encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 relative overflow-hidden">
        
        {/* Background Image behind form - halka */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${scholarImg2})` }}
        />
        <div className="absolute inset-0 bg-[#033044]/50 backdrop-blur-[1px]"></div>
        
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="w-full max-w-md backdrop-blur-2xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 relative z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">Join Us Today</h2>
            <p className="text-white/90 font-medium">Create your account and start your journey</p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-white text-sm uppercase tracking-wider">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-4 backdrop-blur-xl bg-white/25 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-[#37c4ef] focus:border-[#37c4ef] focus:bg-white/30 transition-all shadow-lg font-medium"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-[#37c4ef] mt-2 text-sm font-bold drop-shadow-lg">⚠ Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-white/90 text-sm uppercase tracking-wider">Photo</label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              {...register("photo", { required: true })}
              className="w-full p-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#37c4ef] file:text-white hover:file:bg-[#1faed1] file:font-semibold transition-all shadow-lg"
            />
            {errors.photo && (
              <p className="text-[#37c4ef] mt-2 text-sm font-medium">⚠ Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-white text-sm uppercase tracking-wider">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-4 backdrop-blur-xl bg-white/25 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-[#37c4ef] focus:border-[#37c4ef] focus:bg-white/30 transition-all shadow-lg font-medium"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-[#37c4ef] mt-2 text-sm font-bold drop-shadow-lg">⚠ Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-white text-sm uppercase tracking-wider">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
              className="w-full p-4 backdrop-blur-xl bg-white/25 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-[#37c4ef] focus:border-[#37c4ef] focus:bg-white/30 transition-all shadow-lg font-medium"
              placeholder="Create a strong password"
            />
            {errors.password?.type === "required" && (
              <p className="text-[#37c4ef] mt-2 text-sm font-bold drop-shadow-lg">⚠ Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-[#37c4ef] mt-2 text-sm font-bold drop-shadow-lg">⚠ Password must be 6 characters or longer</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-[#37c4ef] mt-2 text-sm font-bold drop-shadow-lg">
                ⚠ Must include uppercase, lowercase, number & special character
              </p>
            )}
          </div>

          {/* Register Button */}
          <button className="w-full bg-gradient-to-r from-[#37c4ef] to-[#1faed1] hover:from-[#1faed1] hover:to-[#37c4ef] text-[#033044] font-black text-lg py-4 rounded-xl shadow-xl shadow-[#37c4ef]/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#37c4ef]/70 border-2 border-white/20">
            CREATE ACCOUNT
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-white font-medium">
            Already have an account?
            <Link
              className="text-[#37c4ef] font-bold hover:text-white ml-2 transition-colors drop-shadow-lg"
              to="/login"
              state={location.state}
            >
              Sign In →
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

export default Register;