<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

import WelcomeAuthComponent from '@/components/auth/WelcomeAuthComponent.vue'
import AuthFormComponent from '@/components/auth/AuthFormComponent.vue'
import PassageiroComponent from '@/components/auth/AuthSuccess/PassageiroComponent.vue'
import MotoristaComponent from '@/components/auth/AuthSuccess/MotoristaComponent.vue'
import AdminPage from '@/components/auth/AuthSuccess/AdminPage.vue'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

onMounted(() => {
  themeManager.init()
  authState.restaurarState()
})
</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <WelcomeAuthComponent v-if="authState.state === 'autentificacao'" />
    <AuthFormComponent    v-else-if="authState.state === 'inicio'" />
    <PassageiroComponent v-else-if="authState.state === 'passageiro'" />
    <MotoristaComponent v-else-if="authState.state === 'motorista'" />
    <AdminPage      v-else-if="authState.state === 'admin'" />
  </main>
</template>

<style scoped>
main {
  padding-top: 110px;
}
</style>
