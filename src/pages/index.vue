<script lang="ts" setup>
import { getQuizQuestions } from '@/services/questionsService'
import { useQuizStore } from '@/stores/app'
import { scrollNext } from '@/composables'
import type { QuestionOption, QuizQuestion, QuizAnswer } from '@/types'

const router = useRouter()
const store = useQuizStore()

const scrollFromTop = ref<number>(0)
const loading = ref<boolean>(true)

const quizQuestions = computed(() => store.getAllQuizQuestions)
const quizAnswers = computed(() => store.quizAnswers)

// FIXME move try-catch away from here
const populateQuizQuestions = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getQuizQuestions() 
    store.setQuizQuestions(response.data as QuizQuestion[])
  } catch (e) {
    console.warn(e)
  } finally {
    loading.value = false
  }
}

const onScroll = (): void => {
  scrollFromTop.value = window.scrollY
}

const setEventListeners = (): void => {
  window.addEventListener('scroll', onScroll, true) 
}

const handleInitialScrollPosition = (): void => {
  setTimeout(() => {
    scrollNext()
  }, 3500)
}

const handleSelectOption = (selectedOption: QuestionOption, position: number): void => {
  quizAnswers.value[position].answer = selectedOption.value
  setTimeout(() => {
    scrollNext()
  }, 500)
}

const handleSubmitClick = (): void => {
  const anyUnansweredQuestion = quizAnswers.value.find(el => el.answer === null)
  if(anyUnansweredQuestion) {
    scrollNext()
  } else {
    router.push('/quizresults')
          .catch((e: unknown) => { console.warn(e) })
  }
}

const handleJumpToQuestionClick = (questionIndex: number): void => {
  scrollNext(questionIndex)
}

onMounted(() => {
  handleInitialScrollPosition()
  setEventListeners()
  populateQuizQuestions()
})

</script>

<template>
  <LoadingComponent v-if="loading" />
  <div v-else>
    <QuizQuestion v-for="(quizQuestion, questionIndex) in quizQuestions"
                  :key="quizQuestion.question"
                  :quiz-question="quizQuestion"
                  :question-position="questionIndex + 1"
                  :scroll-from-top="scrollFromTop"
                  @option-selected="handleSelectOption($event, questionIndex)"
    />
    <ScrollFiller :quiz-questions-count="quizQuestions.length" />
    <AnswersCollected @submit-clicked="handleSubmitClick"
                      @jump-to-question-clicked="handleJumpToQuestionClick"
    />
  </div>
</template>

<style lang="scss" scoped>
//
</style>
