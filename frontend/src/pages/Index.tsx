
import MainLayout from "@/components/layout/MainLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import PatientList from "@/components/dashboard/PatientList";
import UpcomingSessions from "@/components/dashboard/UpcomingSessions";
import RecentSessions from "@/components/dashboard/RecentSessions";
import ScenarioList from "@/components/dashboard/ScenarioList";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PatientList />
          </div>
          <div className="space-y-6">
            <UpcomingSessions />
            <ScenarioList />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RecentSessions />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
