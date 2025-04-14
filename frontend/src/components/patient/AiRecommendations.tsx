
import { useEffect, useState } from 'react';
import { Patient } from '@/data/types';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AiRecommendation {
  title: string;
  description: string;
  techniques: string[];
}

interface AiRecommendationsProps {
  patient: Patient;
}

const AiRecommendations = ({ patient }: AiRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientData: {
            id: patient.id,
            name: patient.name,
            age: patient.age,
            grade: patient.grade,
            diagnosis: patient.diagnosis,
            ssisMetrics: patient.ssisMetrics
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch AI recommendations');
      }

      const data = await response.json();
      
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
        toast({
          title: "AI Recommendations Generated",
          description: "New personalized recommendations are ready",
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: "Failed to Generate Recommendations",
        description: err instanceof Error ? err.message : "The AI model couldn't process the request",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">AI-Generated Recommendations</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchRecommendations}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive">Error</h4>
              <p className="text-sm text-destructive/90 mt-1">{error}</p>
              <p className="text-sm text-destructive/90 mt-2">
                Make sure the backend server is running and the AI model is properly loaded.
              </p>
            </div>
          </div>
        </div>
      )}

      {recommendations.length === 0 && !loading && !error ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            Click "Generate New" to create AI-powered recommendations based on patient data
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-1">{rec.title}</h4>
              <p className="text-sm text-purple-700 mb-3">{rec.description}</p>
              <div className="border bg-white rounded-md p-3">
                <h5 className="text-sm font-medium mb-1">Suggested Techniques</h5>
                <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                  {rec.techniques.map((technique, i) => (
                    <li key={i}>{technique}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AiRecommendations;
