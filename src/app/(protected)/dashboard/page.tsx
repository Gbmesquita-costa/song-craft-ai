import { auth } from "@/../auth";
import { AdminDashboard } from "../_components/admin-dashboard";

const Dashboard = async () => {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session?.user)}</div>
      <AdminDashboard />;
    </>
  );
};

export default Dashboard;
