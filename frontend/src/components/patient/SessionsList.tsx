
import { Button } from "@/components/ui/button";
import { Session } from "@/data/types";
import { Calendar, Clock, PlusCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

interface SessionsListProps {
  sessions: Session[];
}

const SessionsList = ({ sessions }: SessionsListProps) => {
  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No sessions recorded yet
          </p>
          <Button>Schedule First Session</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{session.scenario}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {format(parseISO(session.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {session.metrics.overallScore.toFixed(1)}/5
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{session.duration} minutes</span>
                  </div>
                </div>
              </div>

              {session.therapistNotes && (
                <div className="mt-3 text-sm">
                  <p className="font-medium">Therapist Notes:</p>
                  <p className="text-muted-foreground">
                    {session.therapistNotes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                <MetricBadge
                  label="Initiation"
                  value={session.metrics.initiationScore}
                />
                <MetricBadge
                  label="Eye Contact"
                  value={session.metrics.eyeContactScore}
                />
                <MetricBadge
                  label="Tone"
                  value={session.metrics.toneModulationScore}
                />
                <MetricBadge
                  label="Anxiety"
                  value={5 - session.metrics.anxietyLevel}
                  inverse
                />
              </div>

              {session.metrics.ssisMetrics && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">SSIS Metrics:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {session.metrics.ssisMetrics.communication !== undefined && (
                      <MetricBadge
                        label="Communication"
                        value={session.metrics.ssisMetrics.communication}
                      />
                    )}
                    {session.metrics.ssisMetrics.cooperation !== undefined && (
                      <MetricBadge
                        label="Cooperation"
                        value={session.metrics.ssisMetrics.cooperation}
                      />
                    )}
                    {session.metrics.ssisMetrics.assertion !== undefined && (
                      <MetricBadge
                        label="Assertion"
                        value={session.metrics.ssisMetrics.assertion}
                      />
                    )}
                    {session.metrics.ssisMetrics.selfControl !== undefined && (
                      <MetricBadge
                        label="Self-Control"
                        value={session.metrics.ssisMetrics.selfControl}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const MetricBadge = ({
  label,
  value,
  inverse = false,
}: {
  label: string;
  value: number;
  inverse?: boolean;
}) => {
  // For inverse metrics like anxiety, a lower score is better
  const actualValue = inverse ? value : value;
  
  let bgColor = "bg-gray-100";
  if (actualValue >= 4) bgColor = "bg-green-100 text-green-800";
  else if (actualValue >= 3) bgColor = "bg-blue-100 text-blue-800";
  else if (actualValue >= 2) bgColor = "bg-yellow-100 text-yellow-800";
  else bgColor = "bg-red-100 text-red-800";

  return (
    <div className={`rounded-md px-2 py-1 text-center ${bgColor}`}>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-sm font-bold">{value.toFixed(1)}/5</p>
    </div>
  );
};

export const SessionsHeader = ({ onNewSession }: { onNewSession: () => void }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">Session History</h3>
      <Button size="sm" onClick={onNewSession}>
        <PlusCircle className="h-4 w-4 mr-2" />
        New Session
      </Button>
    </div>
  );
};

export default SessionsList;
