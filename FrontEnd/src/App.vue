<script setup>
import { RouterView } from 'vue-router'
import NavigationBarComponent from './components/NavigationBarComponent.vue'
import FooterBarComponent from './components/FooterBarComponent.vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()
</script>

<template>
  <NavigationBarComponent/>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <RouterView class="view"/>
  </main>
  <FooterBarComponent/>
</template>

<style scoped>
</style>