import { Link, useLocation } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();

  // Stripe cancel 
  const scholarshipId = location.state?.scholarshipId;
  const error = location.state?.error;

  return (
    <div className="text-center mt-20 px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h2>

      {scholarshipId && (
        <p className="mb-2">
          <span className="font-semibold">Scholarship ID:</span>{" "}
          {scholarshipId}
        </p>
      )}

      <p className="text-gray-600 mb-6">
        {error ||
          "Payment was cancelled or failed. Please try again."}
      </p>

      <Link to="/dashboard/my-applications">
        <button className="btn btn-primary text-black">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentFailed;
