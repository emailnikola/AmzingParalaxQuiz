<script lang="ts" setup>
import { useQuizStore } from '@/stores/app'
import type { QuizQuestion } from '@/types'

const router = useRouter()
const store = useQuizStore()

const correctAnswersCount = ref<number>(-1)

const quizQuestions = computed(() => store.getAllQuizQuestions)
const quizAnswers = computed(() => store.getAllQuizAnswers)

const handleBrowserRefresh = (): void => {
  if (quizAnswers.value.length === 0) {
    router.push('/')
  }
}

const countCorrectAnswers = (): void => {
  let count: number = 0
  quizQuestions.value.forEach((question: QuizQuestion, index: number) => {
    if (question.answer === quizAnswers.value[index].answer) {
      count++
    }
  })
  correctAnswersCount.value = count
}

const getWinPercentage = () => {
  return (correctAnswersCount.value / quizAnswers.value.length * 100).toFixed(2)
}

onMounted(() =>{
  handleBrowserRefresh()
  countCorrectAnswers()
})
</script>

<template>
  <div class="apq-page-wrapper">
    <h1 class="my-8">
      Congratulations!
    </h1>
    <h3 class="my-4">
      You completed the Amazing Paralax Quiz
    </h3>
    <p class="my-2">
      You got {{ correctAnswersCount }} out of 7 questions correct.
    </p>
    <p>
      You are better than {{ getWinPercentage() }}% of the players.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.apq-page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
