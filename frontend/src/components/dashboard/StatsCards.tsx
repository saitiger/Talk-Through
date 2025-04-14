
import {
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { patients, sessions, scheduledSessions } from "@/data/mockData";

const StatsCards = () => {
  const totalPatients = patients.length;
  const totalSessions = sessions.length;
  const upcomingSessions = scheduledSessions.length;
  
  // Calculate average session score
  const averageScore = sessions.reduce((sum, session) => sum + session.metrics.overallScore, 0) / sessions.length;
  
  // Calculate average session duration
  const averageDuration = sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Patients"
        value={totalPatients.toString()}
        icon={<Users className="h-5 w-5" />}
        description="Active patients"
        color="bg-blue-50 text-blue-600"
      />
      <StatCard
        title="Completed Sessions"
        value={totalSessions.toString()}
        icon={<Activity className="h-5 w-5" />}
        description="All time"
        color="bg-teal-50 text-teal-600"
      />
      <StatCard
        title="Avg. Session Score"
        value={`${averageScore.toFixed(1)}/5`}
        icon={<TrendingUp className="h-5 w-5" />}
        description="Overall performance"
        color="bg-coral-50 text-coral-600"
      />
      <StatCard
        title="Upcoming Sessions"
        value={upcomingSessions.toString()}
        icon={<Calendar className="h-5 w-5" />}
        description="Scheduled sessions"
        color="bg-blue-50 text-blue-600"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const StatCard = ({ title, value, icon, description, color }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`rounded-full p-2 ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCards;
