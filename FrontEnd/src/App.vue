<script setup>
import { RouterView } from 'vue-router'
import NavigationBarComponent from './components/NavigationBarComponent.vue'
import FooterBarComponent from './components/FooterBarComponent.vue'
</script>

<template>
  //C:\Users\paulo\AppData\Local\Programs\Python\Python313-32\python.exe manage.py runserver
  <NavigationBarComponent/>
  <main >
    <RouterView class="view"/>
  </main>
  <FooterBarComponent/>
</template>

<style scoped>
</style>