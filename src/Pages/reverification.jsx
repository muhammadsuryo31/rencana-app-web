import ReverificationForm from "../Components/Fragments/ReverificationForm";
import AuthLayout from "../Components/Layouts/AuthLayout";

export default function ReverificationPage(){
  const reverificationTitle = 'reverify your account'
  return(
    <>
    <AuthLayout title={reverificationTitle}>
      <ReverificationForm />
    </AuthLayout>
    </>
  )
}