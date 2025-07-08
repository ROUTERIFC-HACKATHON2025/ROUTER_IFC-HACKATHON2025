import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStateStore = defineStore('authState', () => {
  const state = ref('inicio')

  const mudarState = (novoState) => {
    state.value = novoState
  }

  const reset = () => {
    state.value = 'inicio'
  }

  return {
    state,
    mudarState,
    reset
  }
}) 