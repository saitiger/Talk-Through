
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { patients, sessions, reports } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import the new component files
import PatientProfile from "@/components/patient/PatientProfile";
import SessionsList, { SessionsHeader } from "@/components/patient/SessionsList";
import ProgressCharts from "@/components/patient/ProgressCharts";
import ReportsList, { ReportsHeader } from "@/components/patient/ReportsList";
import Recommendations from "@/components/patient/Recommendations";
import AiRecommendations from "@/components/patient/AiRecommendations";
import PatientDetailHeader from "@/components/patient/PatientDetailHeader";

const PatientDetail = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const patient = patients.find((p) => p.id === patientId);
  const [activeTab, setActiveTab] = useState("sessions");
  
  if (!patient) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Patient Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The patient you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/patients">Return to Patients</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const patientSessions = sessions.filter(
    (session) => session.patientId === patientId
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const patientReports = reports.filter(
    (report) => report.patientId === patientId
  );

  // Calculate average scores
  const calculateAverages = () => {
    if (patientSessions.length === 0) return null;

    const sum = patientSessions.reduce(
      (acc, session) => {
        return {
          initiationScore: acc.initiationScore + session.metrics.initiationScore,
          eyeContactScore: acc.eyeContactScore + session.metrics.eyeContactScore,
          toneModulationScore: acc.toneModulationScore + session.metrics.toneModulationScore,
          anxietyLevel: acc.anxietyLevel + session.metrics.anxietyLevel,
          overallScore: acc.overallScore + session.metrics.overallScore,
        };
      },
      {
        initiationScore: 0,
        eyeContactScore: 0,
        toneModulationScore: 0,
        anxietyLevel: 0,
        overallScore: 0,
      }
    );

    return {
      initiationScore: sum.initiationScore / patientSessions.length,
      eyeContactScore: sum.eyeContactScore / patientSessions.length,
      toneModulationScore: sum.toneModulationScore / patientSessions.length,
      anxietyLevel: sum.anxietyLevel / patientSessions.length,
      overallScore: sum.overallScore / patientSessions.length,
    };
  };

  const averages = calculateAverages();

  const handleScheduleSession = () => {
    console.log("Schedule session for patient:", patientId);
  };

  const handleEditProfile = () => {
    console.log("Edit profile for patient:", patientId);
  };

  const handleNewSession = () => {
    console.log("Create new session for patient:", patientId);
  };

  const handleGenerateReport = () => {
    console.log("Generate report for patient:", patientId);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PatientDetailHeader 
          onScheduleSession={handleScheduleSession}
          onEditProfile={handleEditProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <PatientProfile patient={patient} averages={averages} />
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="sessions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="ai-recommendations">AI Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="sessions" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <SessionsHeader onNewSession={handleNewSession} />
                  </CardHeader>
                  <CardContent>
                    <SessionsList sessions={patientSessions} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="mt-4">
                <Card>
                  <CardHeader>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Progress Tracking</h3>
                  </CardHeader>
                  <CardContent>
                    <ProgressCharts sessions={patientSessions} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <ReportsHeader onGenerateReport={handleGenerateReport} />
                  </CardHeader>
                  <CardContent>
                    <ReportsList reports={patientReports} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-4">
                <Card>
                  <CardHeader>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Activity Recommendations</h3>
                  </CardHeader>
                  <CardContent>
                    <Recommendations />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-recommendations" className="mt-4">
                <Card>
                  <CardHeader>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">AI-Powered Recommendations</h3>
                  </CardHeader>
                  <CardContent>
                    <AiRecommendations patient={patient} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientDetail;
