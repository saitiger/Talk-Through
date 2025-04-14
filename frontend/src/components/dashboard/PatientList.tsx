
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, UserPlus } from "lucide-react";
import { Patient } from "@/data/types";
import { patients } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [metricFilter, setMetricFilter] = useState<string>("all");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAge = 
      ageFilter === "all" ? true :
      ageFilter === "5-8" ? patient.age >= 5 && patient.age <= 8 :
      ageFilter === "9-12" ? patient.age >= 9 && patient.age <= 12 :
      ageFilter === "13+" ? patient.age >= 13 : true;
    
    // Filter by SSIS metric if specified
    let matchesMetric = true;
    if (metricFilter !== "all" && patient.ssisMetrics) {
      const metricValue = patient.ssisMetrics[metricFilter as keyof typeof patient.ssisMetrics] as number;
      matchesMetric = metricValue !== undefined;
    }
    
    return matchesSearch && matchesAge && matchesMetric;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">Patients</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="p-2 border rounded-md text-sm"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="all">All Ages</option>
              <option value="5-8">5-8 years</option>
              <option value="9-12">9-12 years</option>
              <option value="13+">13+ years</option>
            </select>
            <select
              className="p-2 border rounded-md text-sm"
              value={metricFilter}
              onChange={(e) => setMetricFilter(e.target.value)}
            >
              <option value="all">All Skills</option>
              <option value="communication">Communication</option>
              <option value="cooperation">Cooperation</option>
              <option value="assertion">Assertion</option>
              <option value="responsibility">Responsibility</option>
              <option value="empathy">Empathy</option>
              <option value="engagement">Engagement</option>
              <option value="selfControl">Self-Control</option>
            </select>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Patient</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} getInitials={getInitials} />
        ))}
      </div>
    </Card>
  );
};

const PatientCard = ({ 
  patient, 
  getInitials 
}: { 
  patient: Patient, 
  getInitials: (name: string) => string 
}) => {
  return (
    <Link to={`/patients/${patient.id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex items-start gap-4">
        <Avatar className="h-12 w-12">
          {patient.avatar ? (
            <img src={patient.avatar} alt={patient.name} />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(patient.name)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{patient.name}</h3>
          <p className="text-sm text-muted-foreground">
            Age: {patient.age} | {patient.grade}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px] mb-2">
            {patient.diagnosis}
          </p>
          
          {patient.ssisMetrics && (
            <div className="space-y-1.5 mt-2">
              <div className="flex justify-between text-xs">
                <span>SSIS Overall:</span>
                <span>{patient.ssisMetrics.overallScore.toFixed(1)}/5</span>
              </div>
              <Progress 
                value={(patient.ssisMetrics.overallScore / 5) * 100} 
                className="h-1.5" 
              />
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1">
                <SSISBadge 
                  label="Communication" 
                  value={patient.ssisMetrics.communication} 
                />
                <SSISBadge 
                  label="Cooperation" 
                  value={patient.ssisMetrics.cooperation} 
                />
                <SSISBadge 
                  label="Assertion" 
                  value={patient.ssisMetrics.assertion} 
                />
                <SSISBadge 
                  label="Self-Control" 
                  value={patient.ssisMetrics.selfControl} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const SSISBadge = ({ label, value }: { label: string; value: number }) => {
  // Color based on value
  let bgColor = "bg-gray-100 text-gray-700";
  if (value >= 4) bgColor = "bg-green-100 text-green-700";
  else if (value >= 3) bgColor = "bg-blue-100 text-blue-700";
  else if (value >= 2) bgColor = "bg-yellow-100 text-yellow-700";
  else bgColor = "bg-red-100 text-red-700";

  return (
    <div className={`text-[10px] px-1.5 py-0.5 rounded flex justify-between items-center ${bgColor}`}>
      <span>{label}</span>
      <span className="font-medium">{value.toFixed(1)}</span>
    </div>
  );
};

export default PatientList;
