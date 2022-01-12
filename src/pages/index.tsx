import type { NextPage } from "next";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="text-red-700">Welcome page</div>
    </Layout>
  );
};

export default Home;
