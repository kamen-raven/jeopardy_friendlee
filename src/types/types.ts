export interface QuestionContent {
  text?: string;
  description?: string;
  image?: string;
}

export interface Question {
  id: string;
  point: number;
  question: QuestionContent;
  answer: QuestionContent;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface GameData {
  categories: Category[];
}

