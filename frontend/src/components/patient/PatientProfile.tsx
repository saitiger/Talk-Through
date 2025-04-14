
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Patient } from "@/data/types";
import { Progress } from "@/components/ui/progress";

interface PatientProfileProps {
  patient: Patient;
  averages: {
    initiationScore: number;
    eyeContactScore: number;
    toneModulationScore: number;
    anxietyLevel: number;
    overallScore: number;
  } | null;
}

const PatientProfile = ({ patient, averages }: PatientProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
          {getInitials(patient.name)}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold">{patient.name}</h2>
      <p className="text-muted-foreground">
        Age: {patient.age} | {patient.grade}
      </p>
      <div className="my-4 w-full">
        <div className="border-t pt-4 pb-2">
          <h3 className="font-medium text-left">Diagnosis</h3>
          <p className="text-sm text-muted-foreground text-left mt-1">
            {patient.diagnosis}
          </p>
        </div>

        <div className="border-t pt-4 pb-2">
          <h3 className="font-medium text-left">SSIS Metrics</h3>
          {patient.ssisMetrics ? (
            <div className="space-y-3 mt-3">
              <ProgressStat
                label="Communication"
                value={patient.ssisMetrics.communication}
                max={5}
                primary
              />
              <ProgressStat
                label="Cooperation"
                value={patient.ssisMetrics.cooperation}
                max={5}
              />
              <ProgressStat
                label="Assertion"
                value={patient.ssisMetrics.assertion}
                max={5}
              />
              <ProgressStat
                label="Responsibility"
                value={patient.ssisMetrics.responsibility}
                max={5}
              />
              <ProgressStat
                label="Empathy"
                value={patient.ssisMetrics.empathy}
                max={5}
              />
              <ProgressStat
                label="Engagement"
                value={patient.ssisMetrics.engagement}
                max={5}
              />
              <ProgressStat
                label="Self-Control"
                value={patient.ssisMetrics.selfControl}
                max={5}
              />
              <ProgressStat
                label="Overall Score"
                value={patient.ssisMetrics.overallScore}
                max={5}
                primary
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-left mt-1">
              No SSIS metrics recorded yet
            </p>
          )}
        </div>
        
        <div className="border-t pt-4 pb-2">
          <h3 className="font-medium text-left">Session Metrics</h3>
          {averages ? (
            <div className="space-y-3 mt-3">
              <ProgressStat
                label="Initiation"
                value={averages.initiationScore}
                max={5}
              />
              <ProgressStat
                label="Eye Contact"
                value={averages.eyeContactScore}
                max={5}
              />
              <ProgressStat
                label="Tone Modulation"
                value={averages.toneModulationScore}
                max={5}
              />
              <ProgressStat
                label="Overall Progress"
                value={averages.overallScore}
                max={5}
                primary
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-left mt-1">
              No sessions recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProgressStat = ({
  label,
  value,
  max,
  primary = false,
}: {
  label: string;
  value: number;
  max: number;
  primary?: boolean;
}) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>
          {value.toFixed(1)}/{max}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${primary ? "bg-muted" : "bg-muted/50"}`} 
      />
    </div>
  );
};

export default PatientProfile;
