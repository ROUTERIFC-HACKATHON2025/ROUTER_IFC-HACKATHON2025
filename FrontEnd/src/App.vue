<script setup>
import { RouterView } from 'vue-router'
import NavigationBarComponent from './components/NavigationBarComponent.vue'
import FooterBarComponent from './components/FooterBarComponent.vue'
</script>

<template>
  <NavigationBarComponent/>
  <main >
    <RouterView class="view"/>
  </main>
  <FooterBarComponent/>
</template>

<style scoped>
</style>
