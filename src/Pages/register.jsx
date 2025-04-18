import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import RegisterForm from "../Components/Fragments/RegisterForm";
import AuthLayout from "../Components/Layouts/AuthLayout";
import Layout from "./layout";

export default function RegisterPage(){
  const RegisterTitle = 'Create your account'
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return(
    <>
      <Layout>
        <AuthLayout title={RegisterTitle}>
          <RegisterForm />
        </AuthLayout>
      </Layout>
    </>
  )
}