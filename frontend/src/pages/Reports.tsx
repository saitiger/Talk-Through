
import MainLayout from "@/components/layout/MainLayout";
import ComingSoon from "@/components/shared/ComingSoon";
import { BarChart3 } from "lucide-react";

const Reports = () => {
  return (
    <MainLayout>
      <ComingSoon
        title="Reports"
        description="The Reports feature is coming soon! Here you'll be able to view detailed analytics and generate reports on patient progress."
        icon={<BarChart3 size={50} />}
      />
    </MainLayout>
  );
};

export default Reports;
