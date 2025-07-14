<script setup>
import { RouterView } from 'vue-router'
import NavigationBarComponent from './components/NavigationBarComponent.vue'
import FooterBarComponent from './components/FooterBarComponent.vue'
</script>

<template>
  <navigation-bar-component />
  <main >
    <RouterView />
  </main>
  <footer-bar-component />
</template>

<style scoped>
</style>
