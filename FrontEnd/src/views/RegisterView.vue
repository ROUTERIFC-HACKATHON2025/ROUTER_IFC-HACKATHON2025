<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import RegisterPassageiroComponent from '@/components/register/RegisterPassageiroComponent.vue';
import RegisterMotoristaComponent from '@/components/register/RegisterMotoristaComponent.vue';

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

onMounted(() => {
  themeManager.init()
  authState.restaurarStateAuth()
})

</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <register-passageiro-component v-if="authState.stateAuth === 'Passageiro'"/>
    <register-motorista-component v-else-if="authState.stateAuth === 'Motorista'"/>
  </main>
</template>

<style scoped>
main {
  padding-top: 50px;
}
</style>
