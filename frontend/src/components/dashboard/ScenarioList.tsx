
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scenarios } from "@/data/mockData";
import { Link } from "react-router-dom";

const ScenarioList = () => {
  const featuredScenarios = scenarios.slice(0, 3);

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Featured Scenarios</CardTitle>
          <Link to="/builder" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredScenarios.map((scenario) => (
            <Link key={scenario.id} to={`/builder/${scenario.id}`}>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{scenario.title}</h3>
                    <Badge className={difficultyColor(scenario.difficulty)}>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {scenario.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Ages:{" "}
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
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioList;
