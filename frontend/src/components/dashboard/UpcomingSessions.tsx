
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Monitor, User } from "lucide-react";
import { scheduledSessions } from "@/data/mockData";
import { format, parseISO } from "date-fns";

const UpcomingSessions = () => {
  // Sort sessions by date/time and take only upcoming ones
  const upcomingSessions = [...scheduledSessions]
    .sort((a, b) => {
      // Sort by date first, then by time
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .filter((session) => {
      const sessionDate = new Date(`${session.date} ${session.time}`);
      return sessionDate > new Date();
    })
    .slice(0, 5); // Get only the next 5 sessions

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingSessions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No upcoming sessions</p>
        ) : (
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 rounded-md p-2 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{session.patientName}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {format(parseISO(session.date), "MMM d")} · {session.time}
                        </span>
                      </div>
                    </div>
                    <Badge variant={session.isVirtual ? "outline" : "default"} className="mt-0.5">
                      {session.isVirtual ? (
                        <div className="flex items-center gap-1">
                          <Monitor className="h-3 w-3" />
                          <span>Virtual</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>In-Person</span>
                        </div>
                      )}
                    </Badge>
                  </div>
                  {session.scenario && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      Scenario: {session.scenario}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
