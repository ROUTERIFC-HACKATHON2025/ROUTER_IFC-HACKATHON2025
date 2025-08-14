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
    if (salvo === 'inicio' || salvo === 'autentificacao' || salvo === 'passageiro' || salvo === 'motorista' || salvo === 'admin') {
      state.value = salvo
    }
  }

  const mudarStateAuth = (novoState) => {
    state.value = novoState
    localStorage.setItem('authStateAuth', novoState)  
  }

   const resetAuth = () => {
    state.value = 'Passageiro'
    localStorage.setItem('authState', 'Passageiro')   
  }

  const restaurarStateAuth = () => {
    const salvoAuth = localStorage.getItem('authStateAuth')
    if (salvoAuth === 'Passageiro' || salvoAuth === 'Motorista') {
      state.value = salvoAuth
    }
  }

   const mudarStateEmpresa = (novoState) => {
    state.value = novoState
    localStorage.setItem('authStateEmpresa', novoState)  
  }

   const resetEmpresa = () => {
    state.value = 'Empresa'
    localStorage.setItem('authState', 'Empresa')   
  }

  const restaurarStateEmpresa = () => {
    const salvoEmpresa = localStorage.getItem('authStateEmpresa')
    if (salvoEmpresa === 'Indy' || salvoEmpresa === 'Sul') {
      state.value = salvoEmpresa
    }
  }

  return {
    state,
    mudarState,
    reset,
    restaurarState,
    mudarStateAuth,
    resetAuth,
    restaurarStateAuth,
    mudarStateEmpresa,
    resetEmpresa,
    restaurarStateEmpresa
  }
})
