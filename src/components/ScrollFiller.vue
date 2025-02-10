<script lang="ts" setup>
const props = defineProps({
  quizQuestionsCount: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div style="height: 50vh;" />
  <div v-for="index in props.quizQuestionsCount"
       :id="`filler_${index}`"
       :key="`scroll-filler_${index}`"
       class="apq-scroll-filler"
  >
    <div class="apq-question-wrapper">
      <v-img class="apq-logo"
             src="@/assets/logo.png"
      />
      <div class="text-center">
        <h2 class="text-h2 text-surface">
          FastTrack Amazing Quiz
        </h2>
      </div>
      <div class="apq-distancer" />
    </div>
  </div>
</template>

<style scoped>
.apq-question-wrapper {
  padding: 10%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/background-placeholder.jpg");
  background-size: cover;
  clip-path: polygon(0% -50%, 100% -50%, 100% 100%, 0% 100%);
}
.apq-scroll-filler {
  height: 100vh;
  width: 100vw;
}
.apq-distancer {
  flex-grow: 1;
}
</style>
