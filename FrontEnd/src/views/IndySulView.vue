<script setup>
import { useAuthStateStore } from '@/stores/authState'
import IndyComponent from '@/components/empresa/IndyComponent.vue'
import SulComponent from '@/components/empresa/SulComponent.vue'

const authState = useAuthStateStore()
</script>

<template>
  <main>
    <IndyComponent v-if="authState.state === 'Indy'" />
    <SulComponent v-else-if="authState.state === 'Sul'" />
  </main>
</template>

<style scoped>
</style>
