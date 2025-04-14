
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scheduledSessions } from "@/data/mockData";
import { format, startOfWeek, addDays, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, Users } from "lucide-react";

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week">("week");

  // Get the current week's start date (Sunday)
  const startOfCurrentWeek = startOfWeek(date);
  
  // Group sessions by date for the calendar view
  const groupedSessions = scheduledSessions.reduce((acc, session) => {
    const dateKey = session.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(session);
    return acc;
  }, {} as Record<string, typeof scheduledSessions>);

  // Get day events
  const getDayEvents = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    return groupedSessions[formattedDate] || [];
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Session Calendar</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
              />
              
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">Session Types</h3>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Individual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Group</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-9">
            <Tabs defaultValue="week" className="w-full" onValueChange={(value) => setView(value as "day" | "week")}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Add Group Session
                </Button>
              </div>

              <TabsContent value="day" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{format(date, "MMMM d, yyyy")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DaySchedule events={getDayEvents(date)} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="week" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>
                      {format(startOfCurrentWeek, "MMMM d")} - {format(addDays(startOfCurrentWeek, 6), "MMMM d, yyyy")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WeekSchedule startDate={startOfCurrentWeek} groupedSessions={groupedSessions} />
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

const DaySchedule = ({ events }: { events: typeof scheduledSessions }) => {
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9; // Start at 9 AM
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  });

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No sessions scheduled for this day</div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="border rounded-md p-3 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{event.patientName}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
                <Badge variant={event.isVirtual ? "outline" : "default"}>
                  {event.isVirtual ? "Virtual" : "In-Person"}
                </Badge>
              </div>
              {event.scenario && (
                <p className="text-sm mt-2">{event.scenario}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WeekSchedule = ({ 
  startDate, 
  groupedSessions 
}: { 
  startDate: Date;
  groupedSessions: Record<string, typeof scheduledSessions>;
}) => {
  // Generate days of the week
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startDate, i);
    const formattedDate = format(day, "yyyy-MM-dd");
    return {
      date: day,
      formattedDate,
      dayName: format(day, "EEE"),
      dayNumber: format(day, "d"),
      events: groupedSessions[formattedDate] || []
    };
  });

  // Added some example group sessions
  const groupSessions = [
    {
      id: "gs1",
      title: "Social Skills Group",
      patients: ["Alex Johnson", "Madison Lee", "Olivia Smith"],
      date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      time: "4:00 PM",
      isVirtual: false
    },
    {
      id: "gs2",
      title: "Peer Interaction Workshop",
      patients: ["Ethan Rodriguez", "Noah Chen", "Sophia Patel"],
      date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
      time: "3:30 PM",
      isVirtual: true
    }
  ];

  // Add group sessions to the calendar
  groupSessions.forEach(session => {
    if (!days.find(day => day.formattedDate === session.date)) return;
    
    const dayIndex = days.findIndex(day => day.formattedDate === session.date);
    if (dayIndex >= 0) {
      if (!days[dayIndex].events) {
        days[dayIndex].events = [];
      }
      // Add as a special group session
      days[dayIndex].events.push({
        id: session.id,
        patientId: "group",
        patientName: session.title,
        date: session.date,
        time: session.time,
        isVirtual: session.isVirtual,
        isGroup: true,
        participants: session.patients
      });
    }
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div key={day.formattedDate} className="border rounded-md min-h-[120px]">
          <div className={`text-center py-1 ${format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <div className="text-xs font-medium">{day.dayName}</div>
            <div className="text-sm">{day.dayNumber}</div>
          </div>
          <div className="p-1 space-y-1">
            {day.events.map((event: any) => (
              <div 
                key={event.id} 
                className={`p-1 text-xs rounded ${event.isGroup ? "bg-purple-100 border-purple-200" : "bg-blue-50 border-blue-100"} border`}
              >
                <div className="font-medium truncate">{event.patientName}</div>
                <div className="text-[10px] text-muted-foreground">{event.time}</div>
                {event.isGroup && (
                  <div className="flex items-center text-[10px] mt-1">
                    <Users className="h-2.5 w-2.5 mr-1" />
                    <span>{(event.participants || []).length} participants</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
