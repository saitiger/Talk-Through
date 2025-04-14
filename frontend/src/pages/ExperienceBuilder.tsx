
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { scenarios } from "@/data/mockData";
import { Check, Edit, Plus, Puzzle, Save, Settings, Star, Tags } from "lucide-react";

const ExperienceBuilder = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const currentScenario = selectedScenario
    ? scenarios.find((s) => s.id === selectedScenario)
    : null;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Experience Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Tags className="h-4 w-4 mr-2" />
              Templates
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Experience
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Scenarios</CardTitle>
                <CardDescription>Select a scenario to customize</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedScenario === scenario.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="font-medium">{scenario.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {scenario.difficulty} | Ages:{" "}
                      {scenario.ageGroup.map((age) => {
                        switch (age) {
                          case "elementary":
                            return "5-10";
                          case "middle":
                            return "11-13";
                          case "high":
                            return "14-18";
                          default:
                            return age;
                        }
                      }).join(", ")}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-9">
            {!selectedScenario ? (
              <Card className="h-full flex flex-col items-center justify-center p-8 text-center">
                <Puzzle className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a Scenario</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Choose a scenario from the list or create a new one to
                  customize dialog, scoring, and objectives.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Scenario
                </Button>
              </Card>
            ) : (
              <Tabs defaultValue="overview">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <div className="flex items-center">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="dialog">Dialog</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="checkpoints">Checkpoints</TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="flex gap-2">
                    {editMode ? (
                      <>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setEditMode(false)}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setEditMode(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Scenario
                      </Button>
                    )}
                  </div>
                </div>

                <Card>
                  <TabsContent value="overview" className="m-0">
                    <ScenarioOverview scenario={currentScenario} editMode={editMode} />
                  </TabsContent>

                  <TabsContent value="dialog" className="m-0">
                    <ScenarioDialog scenario={currentScenario} editMode={editMode} />
                  </TabsContent>

                  <TabsContent value="settings" className="m-0">
                    <CardHeader>
                      <CardTitle>Scenario Settings</CardTitle>
                      <CardDescription>
                        Configure difficulty, target skills, and scenario parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {editMode ? (
                          <>
                            <div>
                              <label className="text-sm font-medium mb-1 block">Difficulty</label>
                              <select className="w-full p-2 border rounded-md">
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">Target Age Groups</label>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="cursor-pointer">Elementary (5-10)</Badge>
                                <Badge className="cursor-pointer">Middle School (11-13)</Badge>
                                <Badge variant="outline" className="cursor-pointer">High School (14-18)</Badge>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p className="text-muted-foreground">
                            View and edit scenario settings like difficulty level, duration, 
                            scoring parameters, and target age groups.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </TabsContent>

                  <TabsContent value="checkpoints" className="m-0">
                    <CardHeader>
                      <CardTitle>Discussion Checkpoints</CardTitle>
                      <CardDescription>
                        Reflection questions and guided discussion points
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {editMode ? (
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <h3 className="font-medium mb-2">Checkpoint 1: Initial Approach</h3>
                            <Textarea 
                              defaultValue="What was challenging about starting the conversation? How did you decide what to say first?"
                              className="mb-3"
                            />
                            <div className="flex justify-end">
                              <Button size="sm" variant="outline">Remove</Button>
                            </div>
                          </div>
                          <div className="border rounded-md p-4">
                            <h3 className="font-medium mb-2">Checkpoint 2: Handling Response</h3>
                            <Textarea 
                              defaultValue="How did you feel when you received a response? Was it what you expected?"
                              className="mb-3"
                            />
                            <div className="flex justify-end">
                              <Button size="sm" variant="outline">Remove</Button>
                            </div>
                          </div>
                          <Button className="w-full" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Checkpoint
                          </Button>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          Create discussion checkpoints to guide reflection during or after the scenario. These questions help patients process social interactions.
                        </p>
                      )}
                    </CardContent>
                  </TabsContent>
                </Card>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ScenarioOverview = ({ scenario, editMode }: { scenario: any; editMode: boolean }) => {
  if (!scenario) return null;

  return (
    <>
      <CardHeader>
        <CardTitle>{editMode ? <Input defaultValue={scenario.title} /> : scenario.title}</CardTitle>
        <CardDescription>
          {editMode ? (
            <Textarea defaultValue={scenario.description} className="mt-2" />
          ) : (
            scenario.description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Settings className="h-4 w-4 mr-2" /> Scenario Properties
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="font-medium capitalize">{scenario.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age Groups:</span>
                  <span className="font-medium">{scenario.ageGroup.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Skills:</span>
                  <span className="font-medium">{scenario.tags.join(", ")}</span>
                </div>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Star className="h-4 w-4 mr-2" /> SSIS Metrics Focus
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Communication:</span>
                  <span className="font-medium">Primary</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cooperation:</span>
                  <span className="font-medium">Secondary</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assertion:</span>
                  <span className="font-medium">Primary</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Scenario Objectives</h3>
            {editMode ? (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-primary" />
                  <Input defaultValue="Practice initiating a conversation with service staff" />
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-primary" />
                  <Input defaultValue="Make clear food/drink requests using full sentences" />
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-primary" />
                  <Input defaultValue="Respond appropriately to questions from the cashier" />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-3 w-3 mr-1" /> Add Objective
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Practice initiating a conversation with service staff</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Make clear food/drink requests using full sentences</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Respond appropriately to questions from the cashier</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
};

const ScenarioDialog = ({ scenario, editMode }: { scenario: any; editMode: boolean }) => {
  if (!scenario) return null;

  // Sample dialog for the two example scenarios
  const dialogData = {
    "sc1": [ // Ordering at a café
      {
        role: "scenario",
        text: "You're at the café counter. The barista is waiting to take your order."
      },
      {
        role: "npc",
        character: "Barista",
        text: "Hi there! What can I get for you today?"
      },
      {
        role: "player",
        options: [
          { text: "Um... coffee?", quality: "needs-improvement", feedback: "Try using a complete sentence and being more specific" },
          { text: "I would like a small hot chocolate, please.", quality: "good", feedback: "Great job using a complete sentence and being polite!" },
          { text: "[Look at menu without speaking]", quality: "needs-improvement", feedback: "Remember to respond when someone speaks to you" }
        ]
      },
      {
        role: "npc",
        character: "Barista",
        text: "Sure! Would you like whipped cream on that?"
      },
      {
        role: "player",
        options: [
          { text: "Yes", quality: "basic", feedback: "Good response, but you could elaborate more" },
          { text: "Yes, please. That would be nice.", quality: "excellent", feedback: "Excellent! You gave a clear answer and were polite" },
          { text: "I don't know", quality: "needs-improvement", feedback: "It's okay to be unsure, but try to make a decision" }
        ]
      }
    ],
    "sc3": [ // Group Project Participation
      {
        role: "scenario",
        text: "Your teacher has assigned a group project. You're meeting with your group to decide on roles."
      },
      {
        role: "npc",
        character: "Group Leader",
        text: "So we need to make a poster about recycling. What part would you like to work on?"
      },
      {
        role: "player",
        options: [
          { text: "I don't care.", quality: "needs-improvement", feedback: "Try to show interest in the project" },
          { text: "I'm good at drawing, so I could help with the illustrations.", quality: "excellent", feedback: "Great job sharing your strengths and offering to contribute!" },
          { text: "[Shrug shoulders]", quality: "needs-improvement", feedback: "Remember to use words to communicate" }
        ]
      },
      {
        role: "npc",
        character: "Group Member",
        text: "That would be great! Could you draw some pictures of people recycling different items?"
      },
      {
        role: "player",
        options: [
          { text: "OK.", quality: "basic", feedback: "Good that you agreed, but you could add more detail" },
          { text: "Yes, I can draw people sorting paper, plastic, and glass.", quality: "excellent", feedback: "Excellent! You gave specific details about what you'll contribute" },
          { text: "I guess so.", quality: "needs-improvement", feedback: "Try to sound more enthusiastic about your contribution" }
        ]
      }
    ]
  };

  // Use sc1 (Ordering at a café) dialog by default, or sc3 if selected scenario is Group Project
  const dialogToShow = scenario.id === "sc3" ? dialogData.sc3 : dialogData.sc1;

  return (
    <>
      <CardHeader>
        <CardTitle>Scenario Dialog</CardTitle>
        <CardDescription>
          Conversation flow and response options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {dialogToShow.map((item, index) => {
            if (item.role === "scenario") {
              return (
                <div key={index} className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Scene Description</h3>
                  {editMode ? (
                    <Textarea defaultValue={item.text} />
                  ) : (
                    <p>{item.text}</p>
                  )}
                </div>
              );
            } else if (item.role === "npc") {
              return (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    {item.character?.charAt(0) || "N"}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.character}</div>
                    {editMode ? (
                      <Textarea defaultValue={item.text} className="mt-1" />
                    ) : (
                      <p className="border-l-2 border-primary/30 pl-3 py-1 mt-1">{item.text}</p>
                    )}
                  </div>
                </div>
              );
            } else if (item.role === "player") {
              return (
                <div key={index} className="ml-11 border-l-2 border-dashed border-muted-foreground/50 pl-6 py-2">
                  <div className="font-medium text-sm mb-2">Player Response Options:</div>
                  <div className="space-y-3">
                    {item.options?.map((option, i) => (
                      <div key={i} className={`border rounded-md p-3 ${
                        option.quality === "excellent" ? "border-green-200 bg-green-50" :
                        option.quality === "good" ? "border-blue-200 bg-blue-50" :
                        option.quality === "basic" ? "border-yellow-200 bg-yellow-50" :
                        "border-red-200 bg-red-50"
                      }`}>
                        {editMode ? (
                          <>
                            <Input defaultValue={option.text} className="mb-2" />
                            <div className="flex gap-2 mb-2">
                              <select 
                                className="text-xs p-1 border rounded"
                                defaultValue={option.quality}
                              >
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="basic">Basic</option>
                                <option value="needs-improvement">Needs Improvement</option>
                              </select>
                              <Button size="sm" variant="outline" className="text-xs h-7">
                                <Plus className="h-3 w-3 mr-1" />
                                Skills
                              </Button>
                            </div>
                            <Textarea 
                              defaultValue={option.feedback} 
                              placeholder="Feedback for this response" 
                              className="text-xs"
                            />
                          </>
                        ) : (
                          <>
                            <p className="mb-1">{option.text}</p>
                            <div className="flex gap-2 text-xs">
                              <Badge
                                variant="outline"
                                className={`${
                                  option.quality === "excellent" ? "border-green-500 text-green-700" :
                                  option.quality === "good" ? "border-blue-500 text-blue-700" :
                                  option.quality === "basic" ? "border-yellow-500 text-yellow-700" :
                                  "border-red-500 text-red-700"
                                }`}
                              >
                                {option.quality === "excellent" ? "Excellent" :
                                 option.quality === "good" ? "Good" :
                                 option.quality === "basic" ? "Basic" :
                                 "Needs Improvement"}
                              </Badge>
                              <p className="text-muted-foreground italic">{option.feedback}</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    {editMode && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="h-3 w-3 mr-1" /> Add Response Option
                      </Button>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
          {editMode && (
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Dialog Step
            </Button>
          )}
        </div>
      </CardContent>
    </>
  );
};

export default ExperienceBuilder;
