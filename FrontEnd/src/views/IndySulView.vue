<script setup>
import { onMounted } from 'vue'
import { useAuthStateStore } from '@/stores/authState'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import IndyComponent from '@/components/empresa/IndyComponent.vue'
import SulComponent from '@/components/empresa/SulComponent.vue'

const authState = useAuthStateStore()
const themeManager = useThemeManagerStore()

onMounted(() => {
  themeManager.init()
  authState.restaurarStateEmpresa()
})
</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <IndyComponent v-if="authState.stateEmpresa === 'Indy'" />
    <SulComponent v-else-if="authState.stateEmpresa === 'Sul'" />
  </main>
</template>

<style scoped>
</style>
