
import MainLayout from "@/components/layout/MainLayout";
import PatientListComponent from "@/components/dashboard/PatientList";

const PatientList = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Talk Through - Patients</h1>
        </div>
        <PatientListComponent />
      </div>
    </MainLayout>
  );
};

export default PatientList;
