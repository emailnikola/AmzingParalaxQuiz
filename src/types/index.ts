export interface ApiResponse<T> {
  status: number;
  data?: T;
}

export interface QuizQuestion {
  question: string,
  options: string[],
  answer: string
}

export interface QuizAnswer {
  position: number,
  answer: string | null
}

export interface QuestionOption {
  value: string,
  position: number
}
