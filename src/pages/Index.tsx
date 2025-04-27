
import { Suspense, lazy } from 'react';
import Layout from "@/components/layout/Layout";

// Lazy-loaded HomePage component
const HomePage = lazy(() => import('./HomePage'));

const Index = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Layout>
        <HomePage />
      </Layout>
    </Suspense>
  );
};

export default Index;
