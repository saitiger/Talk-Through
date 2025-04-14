
import { Session } from "@/data/types";
import { format, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface ProgressChartsProps {
  sessions: Session[];
}

const ProgressCharts = ({ sessions }: ProgressChartsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">SSIS Metrics Over Time</h3>
        <div className="h-[300px]">
          {sessions.length > 0 ? (
            <ChartContainer
              config={{
                communication: { color: "#3b82f6" },
                cooperation: { color: "#22c55e" },
                assertion: { color: "#7c3aed" },
                selfControl: { color: "#f97316" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sessions
                    .filter(s => s.metrics.ssisMetrics)
                    .map(s => ({
                      date: format(parseISO(s.date), "MMM d"),
                      communication: s.metrics.ssisMetrics?.communication,
                      cooperation: s.metrics.ssisMetrics?.cooperation,
                      assertion: s.metrics.ssisMetrics?.assertion,
                      selfControl: s.metrics.ssisMetrics?.selfControl
                    }))
                    .reverse()
                  }
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="communication"
                    stroke="var(--color-communication)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Communication"
                  />
                  <Line
                    type="monotone"
                    dataKey="cooperation"
                    stroke="var(--color-cooperation)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Cooperation"
                  />
                  <Line
                    type="monotone"
                    dataKey="assertion"
                    stroke="var(--color-assertion)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Assertion"
                  />
                  <Line
                    type="monotone"
                    dataKey="selfControl"
                    stroke="var(--color-selfControl)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Self-Control"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                No progress data available yet
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Session Metrics Over Time</h3>
        <div className="h-[300px]">
          {sessions.length > 0 ? (
            <ChartContainer
              config={{
                initiationScore: { color: "#3b82f6" },
                eyeContactScore: { color: "#22c55e" },
                toneModulationScore: { color: "#7c3aed" },
                anxietyLevel: { color: "#f97316" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sessions
                    .map(s => ({
                      date: format(parseISO(s.date), "MMM d"),
                      initiationScore: s.metrics.initiationScore,
                      eyeContactScore: s.metrics.eyeContactScore,
                      toneModulationScore: s.metrics.toneModulationScore,
                      anxietyLevel: 5 - s.metrics.anxietyLevel // Inverse so higher is better
                    }))
                    .reverse()
                  }
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="initiationScore"
                    stroke="var(--color-initiationScore)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Initiation"
                  />
                  <Line
                    type="monotone"
                    dataKey="eyeContactScore"
                    stroke="var(--color-eyeContactScore)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Eye Contact"
                  />
                  <Line
                    type="monotone"
                    dataKey="toneModulationScore"
                    stroke="var(--color-toneModulationScore)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Tone Modulation"
                  />
                  <Line
                    type="monotone"
                    dataKey="anxietyLevel"
                    stroke="var(--color-anxietyLevel)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Anxiety Control"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                No progress data available yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
