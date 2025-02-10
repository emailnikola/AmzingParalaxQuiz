<script lang="ts" setup>
  //
</script>

<template>
  <div class="apq-loading-wrapper">
    <v-img class="apq-logo"
           src="@/assets/logo.png"
    />
    <v-icon size="100"
            class="apq-spin-loader"
            icon="mdi-loading"
    />
    <h3>Fetching questions...</h3>
    <div class="apq-distancer" />
  </div>
</template>

<style lang="scss" scoped>
.apq-loading-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.apq-spin-loader {
  animation: spinKeyframes 1s infinite linear;
}
.apq-distancer {
  flex-grow: 1;
}
</style>
