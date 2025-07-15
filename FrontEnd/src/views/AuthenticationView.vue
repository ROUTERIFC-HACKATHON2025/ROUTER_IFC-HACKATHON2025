<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

import WelcomeAuthComponent  from '@/components/auth/WelcomeAuthComponent.vue'
import AuthFormComponent     from '@/components/auth/AuthFormComponent.vue'
import AuthSuccessComponent  from '@/components/auth/AuthSuccessComponent.vue'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

onMounted(() => {
  themeManager.init()
  authState.restaurarState()
})
</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <WelcomeAuthComponent v-if="authState.state === 'inicio'" />
    <AuthFormComponent    v-else-if="authState.state === 'autentificacao'" />
    <AuthSuccessComponent v-else />
  </main>
</template>
