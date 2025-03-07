import RegisterForm from "../Components/Fragments/RegisterForm";
import AuthLayout from "../Components/Layouts/AuthLayout";

export default function RegisterPage(){
  const RegisterTitle = 'Create your account'
  return(
    <>
    <AuthLayout title={RegisterTitle}>
      <RegisterForm />
    </AuthLayout>
    </>
  )
}