
const Recommendations = () => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-1">Based on SSIS Profile</h3>
        <p className="text-sm text-blue-700 mb-3">
          Alex would benefit from activities focusing on communication and assertion skills, 
          where he currently shows the most opportunity for growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border bg-white rounded-md p-3">
            <h4 className="text-sm font-medium mb-1">Recommended Scenarios</h4>
            <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
              <li>Playground Introduction (Communication)</li>
              <li>Ordering at a Café (Assertion)</li>
              <li>Group Project Participation (Cooperation)</li>
            </ul>
          </div>
          <div className="border bg-white rounded-md p-3">
            <h4 className="text-sm font-medium mb-1">Practice Exercises</h4>
            <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
              <li>Conversation starters with peers</li>
              <li>Role-playing making requests</li>
              <li>Turn-taking games with visual supports</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
        <h3 className="font-medium text-purple-800 mb-1">AI-Generated Recommendations</h3>
        <p className="text-sm text-purple-700 mb-3">
          Based on Alex's recent progress and session data, the AI recommends focusing on the following areas:
        </p>
        <div className="space-y-3">
          <div className="border bg-white rounded-md p-3">
            <h4 className="text-sm font-medium">Social Initiation Strategy</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Alex's recent sessions show improvement in structured settings but continued challenges 
              with initiating interactions. Consider focusing on:
            </p>
            <ul className="text-xs mt-2 space-y-1 text-muted-foreground list-disc pl-4">
              <li>Providing visual cue cards with conversation starters</li>
              <li>Practicing greetings across various scenarios</li>
              <li>Using special interest topics as conversation bridges</li>
            </ul>
          </div>
          <div className="border bg-white rounded-md p-3">
            <h4 className="text-sm font-medium">Eye Contact Development</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Data shows eye contact remains challenging. Try these techniques:
            </p>
            <ul className="text-xs mt-2 space-y-1 text-muted-foreground list-disc pl-4">
              <li>Use visual targets near faces in VR scenarios</li>
              <li>Practice "triangle technique" (forehead and cheeks)</li>
              <li>Gradually increase duration expectations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Therapist Notes & Recommendations</h3>
        <p className="text-sm text-muted-foreground">
          Alex responds well to structured activities with clear expectations. He benefits from visual 
          supports and reminders. His progress with initiating conversation has been steady but can be 
          accelerated with consistent practice across environments.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Recommend continuing weekly VR sessions focusing on peer interactions, with home practice 
          using conversation starter cards. Would also benefit from monthly group sessions.
        </p>
      </div>
    </div>
  );
};

export default Recommendations;
