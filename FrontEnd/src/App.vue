<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <header-component />
  <main>
    <RouterView />
  </main>
  <footer-component />
</template>

<style scoped>
</style>
