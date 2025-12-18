import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecute";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const { id } = useParams(); // scholarshipId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 

  // Fetch scholarship
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    

    if (isLoading || !scholarship || !user?.email) {
        return;
    }
    

    const paymentInfo = {
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      
     
      amount: scholarship.applicationFees + scholarship.serviceCharge, 
      
     
      applicationFees: scholarship.applicationFees,
      
      universityCity: scholarship.universityCity,
      universityCountry: scholarship.universityCountry,
      subjectCategory: scholarship.subjectCategory,
      
    
      userEmail: user.email, 
    };

    try {
        const res = await axiosSecure.post(
            "/create-checkout-session",
            paymentInfo
        );

      
        window.location.href = res.data.url;
    } catch (error) {
        console.error("Error creating checkout session:", error);
    
        alert("Payment processing failed. Please try again.");
    }
  };

  if (isLoading || !scholarship) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  
  if (!scholarship.applicationFees || !scholarship.serviceCharge) {
      return <div className="text-red-500">Error: Application fees data is missing.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Payment Details
      </h2>
      <p>Application Fee: **${scholarship.applicationFees}**</p>
      <p>Service Charge: **${scholarship.serviceCharge}**</p>
      <p className="text-xl font-semibold mt-2">
        Total Payable: **${scholarship.applicationFees + scholarship.serviceCharge}**
      </p>

      <button
        onClick={handlePayment}
        className="btn btn-primary text-black mt-4"
 >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;