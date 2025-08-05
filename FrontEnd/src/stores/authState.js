import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStateStore = defineStore('authState', () => {
  const state = ref('inicio')

  const mudarState = (novoState) => {
    state.value = novoState
    localStorage.setItem('authState', novoState)  
  }

  const reset = () => {
    state.value = 'inicio'
    localStorage.setItem('authState', 'inicio')   
  }

  const restaurarState = () => {
    const salvo = localStorage.getItem('authState')
    if (salvo === 'inicio' || salvo === 'autentificacao' || salvo === 'finalizado') {
      state.value = salvo
    }
  }

  return {
    state,
    mudarState,
    reset,
    restaurarState
  }
})
