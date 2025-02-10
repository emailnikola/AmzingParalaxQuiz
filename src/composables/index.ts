import { useQuizStore } from '@/stores/app'
import type { QuizAnswer } from '@/types'

const store = useQuizStore()

const quizAnswers = computed(() => store.getAllQuizAnswers)

const smoothScrollToElement = (target: HTMLElement): void => {
  const easing = (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  const inisitalPosition = window.scrollY
  const targetPosition = target.getBoundingClientRect().top + inisitalPosition
  const startTime = Date.now()

  const moveScroll = (): void => {
    const currentTime = Date.now()
    const elapsedTime = (currentTime - startTime) / 1200

    if (elapsedTime < 1) {
      const newPosition = inisitalPosition + (targetPosition - inisitalPosition) * easing(elapsedTime)
      window.scrollTo(0, newPosition)
      requestAnimationFrame(moveScroll)
    } else {
      window.scrollTo(0, targetPosition)
    }
  }
  moveScroll()
}


const scrollToQuestion = (questionIndex: number): void => {
  const questionHtmlElement = document.getElementById(`filler_${questionIndex}`)
  if (questionHtmlElement) {
    smoothScrollToElement(questionHtmlElement)
  }
}

const scrollToSummary = (): void => {
  const summaryHTMLElement = document.getElementById('apq-summary')
  if(summaryHTMLElement) {
    smoothScrollToElement(summaryHTMLElement)
  }
}

export function scrollNext(questionIndex: number = -1): void {
  if (questionIndex >= 0) {
    const questionForUpdate = quizAnswers.value.find((el: QuizAnswer) => el.position === questionIndex + 1)
    if (questionForUpdate) {
      scrollToQuestion(questionForUpdate.position)
    }
  } else {
    const unansweredQuestion = quizAnswers.value.find((el: QuizAnswer) => el.answer === null)
    if (unansweredQuestion) {
      scrollToQuestion(unansweredQuestion.position)
    } else {
      scrollToSummary()
    }
  }
}

