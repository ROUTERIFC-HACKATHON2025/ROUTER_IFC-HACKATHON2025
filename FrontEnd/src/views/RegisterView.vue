<script setup>
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
    <register-motorista-component v-else/>
  </main>
</template>
