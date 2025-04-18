import ReverificationForm from "../Components/Fragments/ReverificationForm";
import AuthLayout from "../Components/Layouts/AuthLayout";
import Layout from "./layout";

export default function ReverificationPage(){
  const reverificationTitle = 'reverify your account'
  return(
    <>
      <Layout>
        <AuthLayout title={reverificationTitle}>
          <ReverificationForm />
        </AuthLayout>
      </Layout>
    </>
  )
}