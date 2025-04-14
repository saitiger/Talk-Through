
import MainLayout from "@/components/layout/MainLayout";
import ComingSoon from "@/components/shared/ComingSoon";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <MainLayout>
      <ComingSoon
        title="Settings"
        description="The Settings page is coming soon! Here you'll be able to customize your account, manage rubrics, and configure data syncing options."
        icon={<SettingsIcon size={50} />}
      />
    </MainLayout>
  );
};

export default Settings;
