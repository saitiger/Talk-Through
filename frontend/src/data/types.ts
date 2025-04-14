
export interface Patient {
  id: string;
  name: string;
  age: number;
  grade: string;
  diagnosis: string;
  avatar?: string;
  ssisMetrics?: SSISMetrics;
}

export interface SSISMetrics {
  communication: number;
  cooperation: number;
  assertion: number;
  responsibility: number;
  empathy: number;
  engagement: number;
  selfControl: number;
  overallScore: number;
}

export interface Session {
  id: string;
  patientId: string;
  date: string;
  scenario: string;
  duration: number;
  completed: boolean;
  therapistNotes?: string;
  metrics: {
    initiationScore: number;
    eyeContactScore: number;
    toneModulationScore: number;
    anxietyLevel: number;
    overallScore: number;
    ssisMetrics?: {
      communication?: number;
      cooperation?: number;
      assertion?: number;
      responsibility?: number;
      empathy?: number;
      engagement?: number;
      selfControl?: number;
    };
  };
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  ageGroup: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  thumbnail?: string;
}

export interface ScheduledSession {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  scenario?: string;
  isVirtual: boolean;
  isGroup?: boolean;
  participants?: string[];
}

export interface Report {
  id: string;
  patientId: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  metrics: SSISMetrics;
  sessionProgress: {
    date: string;
    metrics: {
      communication: number;
      cooperation: number;
      assertion: number;
      selfControl: number;
    };
  }[];
}
