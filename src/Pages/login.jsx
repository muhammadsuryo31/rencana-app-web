import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginForm from "../Components/Fragments/LoginForm";
import AuthLayout from "../Components/Layouts/AuthLayout";

export default function LoginPage() {
  const loginTitle = "Log in to your account";
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {!isAuthenticated && (
        <AuthLayout title={loginTitle}>
          <LoginForm />
        </AuthLayout>
      )}
    </>
  );
}
