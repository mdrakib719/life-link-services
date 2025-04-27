
import Layout from "@/components/layout/Layout";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <SignUpForm />
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
