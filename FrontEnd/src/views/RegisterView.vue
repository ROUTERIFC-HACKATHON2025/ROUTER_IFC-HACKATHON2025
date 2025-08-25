<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import RegisterPassageiroComponent from '@/components/register/RegisterPassageiroComponent.vue';
import RegisterMotoristaComponent from '@/components/register/RegisterMotoristaComponent.vue';

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <register-passageiro-component v-if="authState.state === 'Passageiro'"/>
    <register-motorista-component v-else-if="authState.state === 'Motorista'"/>
  </main>
</template>

<style scoped>
main {
  padding-top: 110px;
}
</style>
