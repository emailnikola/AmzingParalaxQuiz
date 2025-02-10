<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useQuizStore } from '@/stores/app'
import type { PropType } from 'vue'
import type { QuizQuestion } from '@/types'

const { smAndDown: isMobile, height, width } = useDisplay()

const props = defineProps({
  quizQuestion: {
    type: Object as PropType<QuizQuestion>,
    required: true
  },
  questionPosition: {
    type: Number,
    required: true
  },
  scrollFromTop: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['option-selected'])
const store = useQuizStore()
const quizAnswers = computed(() => store.getAllQuizAnswers)
const cols = computed(() => isMobile.value && height.value > width.value ? 12 : 6)
const visibleQuestionIndex = computed(() => Math.floor(props.scrollFromTop / window.innerHeight))

const hideQuestionPercent = (): number => {
  return props.scrollFromTop % window.innerHeight * 2 <= window.innerHeight
        ? (props.scrollFromTop % window.innerHeight * 2) / window.innerHeight * 100
        : 100
}

const revealQuestionPercent = (): number => {
  return props.scrollFromTop % window.innerHeight * 2 > window.innerHeight
        ? Math.max(0, (props.scrollFromTop % window.innerHeight * 2) / window.innerHeight * 100 - 100)
        : 0
}

const handleClick = (option: string): void => {
  emit('option-selected', { value: option, position: props.questionPosition})
}

</script>

<template>
  <div class="apq-quiz-question"
       :class="{
         'apq-quiz-question--visible': visibleQuestionIndex === props.questionPosition - 1,
         'apq-background-image_1': props.questionPosition % 5 === 0,
         'apq-background-image_2': props.questionPosition % 5 === 1,
         'apq-background-image_3': props.questionPosition % 5 === 2,
         'apq-background-image_4': props.questionPosition % 5 === 3,
         'apq-background-image_5': props.questionPosition % 5 === 4
       }"
       :style="`clip-path: polygon(
              ${hideQuestionPercent()}% ${hideQuestionPercent()}%, 100% 0%,
              ${revealQuestionPercent()}% ${revealQuestionPercent()}%, 0% 100%
            )`"
       data-testid="apq-quiz-question"
  >
    <v-img class="apq-logo"
           src="@/assets/logo.png"
    />
    <div class="text-center mb-6">
      <h4 class="text-h4 font-weight-bold text-surface">
        Question {{ props.questionPosition }} of 7
      </h4>
    </div>
    <v-row>
      <v-col :class="{ 'pa-0': isMobile }"
             cols="12"
      >
        <v-card class="py-1"
                color="surface-variant"
                prepend-icon="mdi-rocket-launch-outline"
                rounded="lg"
                variant="outlined"
        >
          <template #image>
            <v-img position="top right" />
          </template>
          <template #title>
            <h4 class="apq-question-title">
              {{ props.quizQuestion.question }}
            </h4>
          </template>
          <v-overlay opacity=".12"
                     scrim="primary"
                     contained
                     model-value
                     persistent
          />
        </v-card>
      </v-col>
      <v-col v-for="option in props.quizQuestion.options"
             :key="option"
             :class="{ 'pa-0': isMobile && height > width }"
             :cols="cols"
      >
        <v-card class="apq-option"
                :class="{
                  'py-1': isMobile,
                  'py-4': !isMobile,
                  'apq-option-selected': quizAnswers[questionPosition - 1] && option === quizAnswers[questionPosition - 1].answer
                }"
                color="surface"
                rounded="lg"
                variant="text"
                :title="option"
                @click="handleClick(option)"
        >
          <v-overlay opacity=".12"
                     contained
                     model-value
                     persistent
                     scrim="secondary"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.apq-quiz-question {
  opacity: 0;
  padding: 5vh 10vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  background-size: cover;
  z-index: 200;
  &--visible {
    opacity: 1;
    pointer-events: all;
  }
}
.apq-background-image_1 {
  background-image: url("@/assets/question-background_1.jpg");
}
.apq-background-image_2 {
  background-image: url("@/assets/question-background_2.jpg");
}
.apq-background-image_3 {
  background-image: url("@/assets/question-background_3.jpg");
}
.apq-background-image_4 {
  background-image: url("@/assets/question-background_4.jpg");
}
.apq-background-image_5 {
  background-image: url("@/assets/question-background_5.jpg");
}
.apq-option {
  border: 2px solid transparent;
}
.apq-option-selected {
  border-color: #90ee90;
}
.apq-question-title {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word; 
  line-height: 1.3;
  color: rgb(var(--v-theme-surface));
}
</style>
