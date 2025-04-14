
import { Patient, Session, Scenario, ScheduledSession, Report } from "./types";

export const patients: Patient[] = [
  {
    id: "p1",
    name: "Alex Johnson",
    age: 8,
    grade: "3rd Grade",
    diagnosis: "ASD Level 1, Social Communication Disorder",
    avatar: "",
    ssisMetrics: {
      communication: 2.5,
      cooperation: 3.2,
      assertion: 2.1,
      responsibility: 3.5,
      empathy: 2.3,
      engagement: 2.8,
      selfControl: 3.0,
      overallScore: 2.8
    }
  },
  {
    id: "p2",
    name: "Madison Lee",
    age: 10,
    grade: "5th Grade",
    diagnosis: "ASD Level 2, ADHD",
    avatar: "",
    ssisMetrics: {
      communication: 2.1,
      cooperation: 1.8,
      assertion: 3.2,
      responsibility: 2.2,
      empathy: 2.5,
      engagement: 2.0,
      selfControl: 1.5,
      overallScore: 2.2
    }
  },
  {
    id: "p3",
    name: "Ethan Rodriguez",
    age: 12,
    grade: "7th Grade",
    diagnosis: "ASD Level 1, Anxiety",
    avatar: "",
    ssisMetrics: {
      communication: 3.3,
      cooperation: 3.5,
      assertion: 2.4,
      responsibility: 3.8,
      empathy: 3.0,
      engagement: 2.5,
      selfControl: 2.9,
      overallScore: 3.1
    }
  },
  {
    id: "p4",
    name: "Olivia Smith",
    age: 7,
    grade: "2nd Grade",
    diagnosis: "Social Communication Disorder",
    avatar: "",
    ssisMetrics: {
      communication: 2.2,
      cooperation: 3.5,
      assertion: 1.8,
      responsibility: 3.1,
      empathy: 3.2,
      engagement: 2.4,
      selfControl: 2.9,
      overallScore: 2.7
    }
  },
  {
    id: "p5",
    name: "Noah Chen",
    age: 14,
    grade: "9th Grade",
    diagnosis: "ASD Level 2, Language Processing Disorder",
    avatar: "",
    ssisMetrics: {
      communication: 1.9,
      cooperation: 2.5,
      assertion: 2.0,
      responsibility: 3.0,
      empathy: 2.3,
      engagement: 1.8,
      selfControl: 2.5,
      overallScore: 2.3
    }
  },
  {
    id: "p6",
    name: "Sophia Patel",
    age: 6,
    grade: "1st Grade",
    diagnosis: "Selective Mutism, Social Anxiety",
    avatar: "",
    ssisMetrics: {
      communication: 1.2,
      cooperation: 2.8,
      assertion: 1.0,
      responsibility: 2.7,
      empathy: 3.0,
      engagement: 1.5,
      selfControl: 2.3,
      overallScore: 2.1
    }
  },
];

export const sessions: Session[] = [
  {
    id: "s1",
    patientId: "p1",
    date: "2025-04-10",
    scenario: "Ordering at a Café",
    duration: 25,
    completed: true,
    therapistNotes: "Alex showed improvement in initiating conversation. Still struggles with eye contact.",
    metrics: {
      initiationScore: 3,
      eyeContactScore: 2,
      toneModulationScore: 4,
      anxietyLevel: 2,
      overallScore: 3.2,
      ssisMetrics: {
        communication: 2.7,
        cooperation: 3.3,
        assertion: 2.3,
        selfControl: 3.1
      }
    },
  },
  {
    id: "s2",
    patientId: "p1",
    date: "2025-04-03",
    scenario: "Playground Introduction",
    duration: 30,
    completed: true,
    therapistNotes: "Made good progress with playground scenario. Used prompt cards effectively.",
    metrics: {
      initiationScore: 2,
      eyeContactScore: 2,
      toneModulationScore: 3,
      anxietyLevel: 3,
      overallScore: 2.5,
      ssisMetrics: {
        communication: 2.5,
        cooperation: 3.0,
        assertion: 2.0,
        selfControl: 2.8
      }
    },
  },
  {
    id: "s3",
    patientId: "p2",
    date: "2025-04-09",
    scenario: "Group Project Participation",
    duration: 35,
    completed: true,
    therapistNotes: "Madison was able to express preferences during group activity simulation.",
    metrics: {
      initiationScore: 4,
      eyeContactScore: 3,
      toneModulationScore: 2,
      anxietyLevel: 4,
      overallScore: 2.8,
      ssisMetrics: {
        communication: 2.3,
        cooperation: 2.1,
        assertion: 3.4,
        selfControl: 1.8
      }
    },
  },
  {
    id: "s4",
    patientId: "p3",
    date: "2025-04-11",
    scenario: "Handling Disagreements",
    duration: 40,
    completed: true,
    therapistNotes: "Ethan showed significant progress in expressing disagreement appropriately.",
    metrics: {
      initiationScore: 4,
      eyeContactScore: 3,
      toneModulationScore: 4,
      anxietyLevel: 2,
      overallScore: 3.8,
      ssisMetrics: {
        communication: 3.5,
        cooperation: 3.7,
        assertion: 2.6,
        selfControl: 3.0
      }
    },
  },
  {
    id: "s5",
    patientId: "p1",
    date: "2025-03-27",
    scenario: "Birthday Party Interactions",
    duration: 35,
    completed: true,
    therapistNotes: "Alex had some difficulty with the multi-person interactions. We'll focus on group settings next time.",
    metrics: {
      initiationScore: 2,
      eyeContactScore: 2,
      toneModulationScore: 3,
      anxietyLevel: 4,
      overallScore: 2.3,
      ssisMetrics: {
        communication: 2.3,
        cooperation: 2.8,
        assertion: 1.9,
        selfControl: 2.7
      }
    },
  },
  {
    id: "s6",
    patientId: "p1",
    date: "2025-03-15",
    scenario: "First Day of School",
    duration: 30,
    completed: true,
    therapistNotes: "Alex did well with teacher interactions but struggled with peer initiation.",
    metrics: {
      initiationScore: 2.5,
      eyeContactScore: 2,
      toneModulationScore: 3,
      anxietyLevel: 3,
      overallScore: 2.6,
      ssisMetrics: {
        communication: 2.4,
        cooperation: 3.0,
        assertion: 2.1,
        selfControl: 2.8
      }
    },
  },
];

export const scenarios: Scenario[] = [
  {
    id: "sc1",
    title: "Ordering at a Café",
    description: "Practice ordering food and drinks at a virtual café, including making requests and handling money.",
    ageGroup: ["elementary", "middle"],
    difficulty: "beginner",
    tags: ["communication", "assertion", "community"],
    thumbnail: "",
  },
  {
    id: "sc2",
    title: "Playground Introduction",
    description: "Learn to introduce yourself to new friends at a playground setting and join ongoing play.",
    ageGroup: ["elementary"],
    difficulty: "beginner",
    tags: ["communication", "engagement", "cooperation"],
    thumbnail: "",
  },
  {
    id: "sc3",
    title: "Group Project Participation",
    description: "Practice sharing ideas, taking turns, and working collaboratively on a group project.",
    ageGroup: ["elementary", "middle", "high"],
    difficulty: "intermediate",
    tags: ["cooperation", "assertion", "communication"],
    thumbnail: "",
  },
  {
    id: "sc4",
    title: "Handling Disagreements",
    description: "Learn strategies for expressing differences of opinion respectfully and resolving conflicts.",
    ageGroup: ["middle", "high"],
    difficulty: "advanced",
    tags: ["self-control", "assertion", "empathy"],
    thumbnail: "",
  },
  {
    id: "sc5",
    title: "First Day of School",
    description: "Navigate introductions, following directions, and classroom routines in a new school environment.",
    ageGroup: ["elementary", "middle", "high"],
    difficulty: "intermediate",
    tags: ["responsibility", "communication", "self-control"],
    thumbnail: "",
  },
  {
    id: "sc6",
    title: "Birthday Party Interactions",
    description: "Practice social skills for birthday parties including greetings, gift-giving, and group activities.",
    ageGroup: ["elementary", "middle"],
    difficulty: "intermediate",
    tags: ["engagement", "cooperation", "empathy"],
    thumbnail: "",
  },
];

export const scheduledSessions: ScheduledSession[] = [
  {
    id: "ss1",
    patientId: "p1",
    patientName: "Alex Johnson",
    date: "2025-04-15",
    time: "3:30 PM",
    scenario: "First Day of School",
    isVirtual: false,
  },
  {
    id: "ss2",
    patientId: "p2",
    patientName: "Madison Lee",
    date: "2025-04-16",
    time: "2:00 PM",
    scenario: "Handling Disagreements",
    isVirtual: true,
  },
  {
    id: "ss3",
    patientId: "p3",
    patientName: "Ethan Rodriguez",
    date: "2025-04-17",
    time: "4:15 PM",
    scenario: "Group Project Participation",
    isVirtual: false,
  },
  {
    id: "ss4",
    patientId: "p4",
    patientName: "Olivia Smith",
    date: "2025-04-15",
    time: "1:00 PM",
    scenario: "Playground Introduction",
    isVirtual: true,
  },
  {
    id: "ss5",
    patientId: "p1",
    patientName: "Alex Johnson",
    date: "2025-04-22",
    time: "3:30 PM",
    scenario: "Birthday Party Interactions",
    isVirtual: false,
  },
];

export const reports: Report[] = [
  {
    id: "r1",
    patientId: "p1",
    title: "Quarterly Progress Report - Q1 2025",
    date: "2025-04-01",
    author: "Dr. Sarah Williams",
    summary: "Alex has shown steady progress in social communication skills over the past quarter. His strengths include verbal expression and cooperation in structured settings. Areas for continued focus include initiating conversations with peers and maintaining appropriate eye contact during social interactions. The Talk Through therapy sessions have been particularly helpful in providing safe practice environments for these skills.",
    strengths: [
      "Strong vocabulary and sentence structure",
      "Responds well to clear, direct instructions",
      "Shows enthusiasm for structured social activities",
      "Makes good progress when using visual supports",
      "Demonstrates improvement in turn-taking skills"
    ],
    challenges: [
      "Initiating conversations with unfamiliar peers",
      "Maintaining eye contact during longer interactions",
      "Adapting to unexpected changes in social situations",
      "Reading and responding to others' emotional cues"
    ],
    recommendations: [
      "Continue weekly VR social skills sessions with focus on peer interactions",
      "Practice 'conversation starter' strategies in various settings",
      "Use video modeling to improve recognition of emotional cues",
      "Schedule monthly group sessions to practice skills with peers",
      "Implement a visual reward system for successful social interactions at home"
    ],
    metrics: {
      communication: 2.5,
      cooperation: 3.2,
      assertion: 2.1,
      responsibility: 3.5,
      empathy: 2.3,
      engagement: 2.8,
      selfControl: 3.0,
      overallScore: 2.8
    },
    sessionProgress: [
      {
        date: "2025-01-15",
        metrics: {
          communication: 2.1,
          cooperation: 2.7,
          assertion: 1.8,
          selfControl: 2.5
        }
      },
      {
        date: "2025-02-01",
        metrics: {
          communication: 2.3,
          cooperation: 2.9,
          assertion: 1.9,
          selfControl: 2.6
        }
      },
      {
        date: "2025-02-15",
        metrics: {
          communication: 2.4,
          cooperation: 3.0,
          assertion: 2.0,
          selfControl: 2.8
        }
      },
      {
        date: "2025-03-01",
        metrics: {
          communication: 2.5,
          cooperation: 3.1,
          assertion: 2.1,
          selfControl: 2.9
        }
      },
      {
        date: "2025-03-15",
        metrics: {
          communication: 2.6,
          cooperation: 3.2,
          assertion: 2.1,
          selfControl: 3.0
        }
      },
      {
        date: "2025-04-01",
        metrics: {
          communication: 2.7,
          cooperation: 3.3,
          assertion: 2.3,
          selfControl: 3.1
        }
      }
    ]
  }
];
