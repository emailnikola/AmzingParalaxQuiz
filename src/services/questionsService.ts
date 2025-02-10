import type { ApiResponse, QuizQuestion } from "@/types"

export const getQuizQuestions = (): Promise<ApiResponse<QuizQuestion[]>> => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: [
        {
          question: "What is the capital city of Australia?",
          options: ["A) Sydney", "B) Melbourne", "C) Canberra", "D) Brisbane"],
          answer: "C) Canberra"
        },
        {
          question: "Which country is known as the 'Land of the Rising Sun'?",
          options: ["A) China", "B) Japan", "C) South Korea", "D) Thailand"],
          answer: "B) Japan"
        },
        {
          question: "Who painted the 'Mona Lisa'?",
          options: ["A) Pablo Picasso", "B) Vincent van Gogh", "C) Leonardo da Vinci", "D) Michelangelo"],
          answer: "C) Leonardo da Vinci"
        },
        {
          question: "What is the currency of Japan?",
          options: ["A) Yuan", "B) Won", "C) Yen", "D) Ringgit"],
          answer: "C) Yen"
        },
        {
          question: "What is the official language of Brazil?",
          options: ["A) Spanish", "B) French", "C) Portuguese", "D) Italian"],
          answer: "C) Portuguese"
        },
        {
          question: "Which city is home to the historic landmark 'The Colosseum'?",
          options: ["A) Paris", "B) Rome", "C) Athens", "D) London"],
          answer: "B) Rome"
        },
        {
          question: "Which island country is located to the southeast of India?",
          options: ["A) Maldives", "B) Sri Lanka", "C) Seychelles", "D) Mauritius"],
          answer: "B) Sri Lanka"
        }
      ]
    })
  }, 1000)
})
