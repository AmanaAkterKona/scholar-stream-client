import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecute";
import useAuth from "../../hooks/useAuth";
import { FaCheckCircle, FaSpinner, FaArrowRight } from "react-icons/fa";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    const confirmPayment = async () => {
      try {
        if (sessionId) {
   
          await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
          
        
          await new Promise((resolve) => setTimeout(resolve, 3500));
          
          navigate("/dashboard/my-applications", { replace: true });
        }
      } catch (error) {
        console.error("Payment confirmation failed:", error);
        navigate("/");
      }
    };

    if (sessionId) {
      confirmPayment();
    }
  }, [sessionId, axiosSecure, user, loading, navigate]);

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center px-4 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>

      <div className="max-w-md w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 text-center border border-white relative z-10 animate-in fade-in zoom-in duration-700">
        
        {/* Success Icon with Pulse Effect */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-green-50 p-6 rounded-full border-4 border-white shadow-sm">
              <FaCheckCircle className="text-green-500 text-7xl" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">
          Payment Success!
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed mb-8">
          Your application has been received. We're redirecting you to your dashboard shortly.
        </p>

        {/* Info Box */}
        <div className="bg-slate-50 rounded-3xl p-5 mb-8 border border-slate-100 group transition-all hover:bg-slate-100">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">
            Payment Session Reference
          </p>
          <p className="text-xs font-mono text-[#008080] break-all bg-white py-2 px-3 rounded-xl border border-slate-200">
            {sessionId || "Processing..."}
          </p>
        </div>

        {/* Loading/Redirect Indicator */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-[#008080] font-bold py-3 px-6 bg-teal-50 rounded-2xl inline-flex">
            <FaSpinner className="animate-spin text-xl" />
            <span className="text-sm">Finalizing Details...</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] font-semibold">
            <span>Redirecting to My Applications</span>
            <FaArrowRight className="animate-bounce-x" />
          </div>
        </div>

        {/* Bottom Progress Bar Animation */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-100 rounded-b-[40px] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-400 to-blue-500 animate-progress"></div>
        </div>
      </div>

      {/* Internal CSS for Custom Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-progress {
          animation: progress 3.5s linear forwards;
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}} />
    </div>
  );
};

export default PaymentSuccess;