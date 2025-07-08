import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserProfileStore = defineStore('userProfile', () => {
  const nome = ref('João Silva')
  const telefone = ref('(47) 99999-9999')
  const email = ref('joao.silva@email.com')
  const senha = ref('123456')
  const nascimento = ref('1990-01-01')

  const atualizarPerfil = (novosDados) => {
    nome.value = novosDados.nome
    telefone.value = novosDados.telefone
    email.value = novosDados.email
    senha.value = novosDados.senha
    nascimento.value = novosDados.nascimento
  }

  return {
    nome,
    telefone,
    email,
    senha,
    nascimento,
    atualizarPerfil
  }
}) 