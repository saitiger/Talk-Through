
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Edit } from "lucide-react";

interface PatientDetailHeaderProps {
  onScheduleSession: () => void;
  onEditProfile: () => void;
}

const PatientDetailHeader = ({ onScheduleSession, onEditProfile }: PatientDetailHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/patients">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Patient Profile</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onScheduleSession}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
        <Button onClick={onEditProfile}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default PatientDetailHeader;
