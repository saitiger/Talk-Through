
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { sessions } from "@/data/mockData";
import { patients } from "@/data/mockData";
import { format, parseISO } from "date-fns";

const RecentSessions = () => {
  // Sort sessions by date (descending) and take the 5 most recent
  const recentSessions = [...sessions]
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 4);

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : "Unknown Patient";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSessions.map((session) => {
            const patientName = getPatientName(session.patientId);
            const scorePercentage = (session.metrics.overallScore / 5) * 100;
            
            return (
              <div key={session.id} className="flex gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {getInitials(patientName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(session.date), "MMM d, yyyy")} · {session.scenario}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{session.metrics.overallScore.toFixed(1)}/5</div>
                      <div className="text-xs text-muted-foreground">{session.duration} mins</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Session Score</span>
                      <span>{scorePercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={scorePercentage} className="h-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
