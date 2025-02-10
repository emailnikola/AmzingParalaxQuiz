import type { QuizAnswer, QuizQuestion } from '@/types'
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quizStore', {
  state: () => ({
    quizQuestions: [] as QuizQuestion[],
    quizAnswers: [] as QuizAnswer[]
  }),
  getters: {
    getAllQuizQuestions: (state) => state.quizQuestions,
    getAllQuizAnswers: (state) => state.quizAnswers
  },
  actions: {
    setQuizQuestions(questionsList: QuizQuestion[]) {
      this.quizQuestions = []
      this.quizAnswers = []
      questionsList.map((question: QuizQuestion, index) => {
        this.quizQuestions.push(question)
        this.quizAnswers.push({ position: index + 1, answer: null })
      })
    }
  }
})
