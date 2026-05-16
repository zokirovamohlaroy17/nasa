export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
  rewardPoints: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown
  quiz: Quiz;
  rewardPoints: number; // For reading the lesson
  imageUrl?: string;
  category: 'astronomiya' | 'fizika' | 'kosmologiya';
}

export interface UserProgress {
  points: number;
  completedLessons: string[]; // lesson ids
  solvedQuizzes: string[]; // lesson ids
}
