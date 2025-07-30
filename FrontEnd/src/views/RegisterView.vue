<script setup>
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import RegisterPassageiroComponent from '@/components/register/RegisterPassageiroComponent.vue';
import RegisterMotoristaComponent from '@/components/register/RegisterMotoristaComponent.vue';

const themeManager = useThemeManagerStore()

</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">
    <register-motorista-component />
  </main>
</template>
