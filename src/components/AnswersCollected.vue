<script lang="ts" setup>
import { useQuizStore } from '@/stores/app'

const emit = defineEmits(['submit-clicked', 'jump-to-question-clicked'])

const store = useQuizStore()

const quizQuestions = computed(() => store.getAllQuizQuestions)
const quizAnswers = computed(() => store.getAllQuizAnswers)

const getUserAnswerForQuestion = (questionIndex: number): string => {
  const questionAnswer = quizAnswers.value[questionIndex]
  return questionAnswer?.answer ? questionAnswer.answer : 'Answer pending'
}

const jumpToQuestionClick = (questionIndex: number): void => {
  emit('jump-to-question-clicked', questionIndex)
}

const submitClicked = (): void => {
  emit('submit-clicked')
}
</script>

<template>
  <div id="apq-summary"
       class="apq-summary"
       data-testid="apq-summary"
  >
    <h1 class="pb-8 text-center">
      QUIZ ANSWERS REVIEW
    </h1>
    <v-card v-for="(quizQuestion, questionIndex) in quizQuestions"
            :key="quizQuestion.question"
            elevated
            rounded="lg"
            class="apq-summary--item"
            :data-testid="`apq-summary--item_${questionIndex}`"
    >
      <v-icon size="42"
              class="apq-summary--item--position"
              :icon="`mdi-numeric-${questionIndex + 1}`"
      />
      <div class="apq-summary--item--question">
        <p class="text-center">
          {{ quizQuestion.question }}
        </p>
        <p class="text-center">
          {{ getUserAnswerForQuestion(questionIndex) }}
        </p>
      </div>
      <v-icon class="apq-summary--item--action"
              icon="mdi-arrow-up-right"
              @click="jumpToQuestionClick(questionIndex)"
      />
    </v-card>
    <div class="apq-submit-button-wrapper">
      <v-btn block
             color="primary"
             @click="submitClicked"
      >
        Submit
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.apq-summary {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 10%;
  background-color: rgb(var(--v-theme-secondary));
  z-index: 50;
  &--item {
    display: flex;
    align-items: center;
    background-color: rgba(var(--v-theme-darkest), 0.473);
    padding: 4px;
    margin: 4px;
    border-radius: 12px;
    &--position {
      margin: 4px 8px 4px 0;

    }
    &--action {
      font-size: 24px;
      height: 42px;
      width: 42px;
      margin: 4px 0 4px 8px;
    }
  }
}
.apq-submit-button-wrapper {
  width: 100%;
  margin-top: 32px;
  max-width: 500px;
  button {
    z-index: 0;
  }
}
</style>
