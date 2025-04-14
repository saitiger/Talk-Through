
import { Button } from "@/components/ui/button";
import { Report } from "@/data/types";
import { FileText } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ReportsListProps {
  reports: Report[];
}

const ReportsList = ({ reports }: ReportsListProps) => {
  return (
    <div>
      {reports.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No reports available yet
          </p>
          <Button>Create First Report</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border rounded-lg overflow-hidden">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => {}}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      {report.title}
                    </h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span>{format(parseISO(report.date), "MMMM d, yyyy")}</span>
                      <span className="mx-2">•</span>
                      <span>By {report.author}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Report
                  </Button>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    {report.summary.length > 150 
                      ? `${report.summary.substring(0, 150)}...` 
                      : report.summary}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Strengths</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                      {report.strengths.slice(0, 3).map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                      {report.strengths.length > 3 && (
                        <li className="text-primary">
                          +{report.strengths.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Challenges</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                      {report.challenges.slice(0, 3).map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                      {report.challenges.length > 3 && (
                        <li className="text-primary">
                          +{report.challenges.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                      {report.recommendations.slice(0, 3).map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                      {report.recommendations.length > 3 && (
                        <li className="text-primary">
                          +{report.recommendations.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ReportsHeader = ({ onGenerateReport }: { onGenerateReport: () => void }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">Assessment Reports</h3>
      <Button size="sm" onClick={onGenerateReport}>
        <FileText className="h-4 w-4 mr-2" />
        Generate Report
      </Button>
    </div>
  );
};

export default ReportsList;
