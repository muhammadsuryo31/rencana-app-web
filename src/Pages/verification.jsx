import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../utils";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    const verifyUserEmail = async () => {
      try {
        const response = await api.post(`users/verify/${token}`);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Email Verified!",
            text: "Your email has been successfully verified. Redirecting to login...",
            timer: 3000,
            showConfirmButton: false,
          });

          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        if(error.status === 409){
          Swal.fire({
            icon: "info",
            title: "Verification Failed",
            text: error.response?.data?.error || "user already verified",
          });
          navigate("/login")
        } else if(error.response?.data?.error === "Invalid or expired verification token"){
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: error.response?.data?.error,
          });
          navigate("/reverify")
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: error.response?.data?.error || "Invalid or expired verification link.",
          });
          navigate("/login")
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p className="text-lg font-semibold">Verifying your email...</p>
      ) : (
        <p className="text-lg font-semibold">Redirecting to login...</p>
      )}
    </div>
  );
};
