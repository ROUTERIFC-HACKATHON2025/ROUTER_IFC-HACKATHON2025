import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStateStore = defineStore('authState', () => {
  const state = ref('inicio')
  const stateAuth = ref('Passageiro')
  const stateEmpresa = ref('Indy')   
  const stateAdminPage = ref('vans') 

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
    if (['inicio', 'autentificacao', 'passageiro', 'motorista', 'admin'].includes(salvo)) {
      state.value = salvo
    }
  }

  const mudarStateAuth = (novoState) => {
    stateAuth.value = novoState
    localStorage.setItem('authStateAuth', novoState)  
  }

  const resetAuth = () => {
    stateAuth.value = 'Passageiro'
    localStorage.setItem('authStateAuth', 'Passageiro')   
  }

  const restaurarStateAuth = () => {
    const salvo = localStorage.getItem('authStateAuth')
    if (['Passageiro', 'Motorista'].includes(salvo)) {
      stateAuth.value = salvo
    }
  }

  const mudarStateEmpresa = (novoState) => {
    stateEmpresa.value = novoState
    localStorage.setItem('authStateEmpresa', novoState)  
  }

  const resetEmpresa = () => {
    stateEmpresa.value = 'Empresa'
    localStorage.setItem('authStateEmpresa', 'Empresa')   
  }

  const restaurarStateEmpresa = () => {
    const salvo = localStorage.getItem('authStateEmpresa')
    if (['Indy', 'Sul'].includes(salvo)) {
      stateEmpresa.value = salvo
    }
  }

  const mudarAdminPage = (novoState) => {
    stateAdminPage.value = novoState
    localStorage.setItem('AdminPage', novoState)  
  }

  const resetAdmin = () => {
    stateAdminPage.value = 'vans'
    localStorage.setItem('AdminPage', 'vans')   
  }

  const restaurarAdminPage = () => {
    const salvo = localStorage.getItem('AdminPage')
    const mapa = {
      motoristas: 'motorista',
      passageiros: 'passageiro'
    }
    const normalizado = mapa[salvo] || salvo
    if (['vans', 'motorista', 'passageiro', 'configVans'].includes(normalizado)) {
      stateAdminPage.value = normalizado
    } 
  }

  return {
    state,
    stateAuth,
    stateEmpresa,
    stateAdminPage,
    mudarState,
    reset,
    restaurarState,
    mudarStateAuth,
    resetAuth,
    restaurarStateAuth,
    mudarStateEmpresa,
    resetEmpresa,
    restaurarStateEmpresa,
    mudarAdminPage,
    resetAdmin,
    restaurarAdminPage
  }
})
