// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

// Session types
export interface Session {
  user: User;
  expires: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  completed?: boolean;
}

// Quiz types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Progress types
export interface UserProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: Date;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
} 