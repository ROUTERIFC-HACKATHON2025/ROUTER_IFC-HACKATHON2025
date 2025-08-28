import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserProfileStore = defineStore('userProfile', () => {
  const nomePassageiro = ref('João Silva')
  const telefonePassageiro = ref('(47) 99999-9999')
  const emailPassageiro = ref('joao.silva@email.com')
  const senhaPassageiro = ref('123456')
  const nascimentoPassageiro = ref('1990-01-01')

  const atualizarPerfilPassageiro = (novosDados) => {
    nomePassageiro.value = novosDados.nomePassageiro
    telefonePassageiro.value = novosDados.telefonePassageiro
    emailPassageiro.value = novosDados.emailPassageiro
    senhaPassageiro.value = novosDados.senhaPassageiro
    nascimentoPassageiro.value = novosDados.nascimentoPassageiro
  }

  const nomeMotorista = ref('Pedro')
  const telefoneMotorista = ref('(47) 99999-9999')
  const emailMotorista = ref('pedro@email.com')
  const senhaMotorista = ref('123456')
  const nascimentoMotorista = ref('1990-01-01')

  const atualizarPerfilMotorista = (novosDados) => {
    nomeMotorista.value = novosDados.nomeMotorista
    telefoneMotorista.value = novosDados.telefoneMotorista
    emailMotorista.value = novosDados.emailMotorista
    senhaMotorista.value = novosDados.senhaMotorista
    nascimentoMotorista.value = novosDados.nascimentoMotorista
  }

  const vans = ref([
    { id: 0, nome: 'van1', placa: 'ABC-1234', acentos: 18 },
    { id: 1, nome: 'van2', placa: 'ABC-1234', acentos: 18 },
    { id: 2, nome: 'van3', placa: 'ABC-1234', acentos: 18 },
    { id: 3, nome: 'van4', placa: 'ABC-1234', acentos: 18 },
    { id: 4, nome: 'van5', placa: 'ABC-1234', acentos: 18 },
    { id: 5, nome: 'van6', placa: 'ABC-1234', acentos: 18 },
  ])

  const passageiros = ref([
    {
      id: 0,
      nome: 'passageiro1',
      nascimento: '1990-01-01',
      cpf: '123344354535',
      email: 'a@a',
      telefone: '123444',
      endereco: 'rua tal',
      descricao: 'aaaaaaaaaaa'
    },
    {
      id: 1,
      nome: 'passageiro2',
      nascimento: '1990-01-01',
      cpf: '123344354535',
      email: 'a@a',
      telefone: '123444',
      endereco: 'rua tal',
      descricao: 'aaaaaaaaaaa'
    },
    {
      id: 2,
      nome: 'passageiro3',
      nascimento: '1990-01-01',
      cpf: '123344354535',
      email: 'a@a',
      telefone: '123444',
      endereco: 'rua tal',
      descricao: 'aaaaaaaaaaa'
    },
  ])

  const motoristas = ref([
    {
      id: 0,
      nome: 'motorista1',
      nascimento: '1990-01-01',
      cpf: '123344354535',
      email: 'a@a',
      telefone: '123444',
      endereco: 'rua tal',
      descricao: 'aaaaaaaaaaa'
    },
    {
      id: 1,
      nome: 'motorista2',
      nascimento: '1990-01-01',
      cpf: '123344354535',
      email: 'a@a',
      telefone: '123444',
      endereco: 'rua tal',
      descricao: 'aaaaaaaaaaa'
    },
    {
      id: 2,
      nome: 'motorista3',
      nascimento: '1990-01-01',
      cpf: '123344354535',
      email: 'a@a',
      telefone: '123444',
      endereco: 'rua tal',
      descricao: 'aaaaaaaaaaa'
    },
  ])

  return {
    nomePassageiro,
    telefonePassageiro,
    emailPassageiro,
    senhaPassageiro,
    nascimentoPassageiro,
    atualizarPerfilPassageiro,
    nomeMotorista,
    telefoneMotorista,
    emailMotorista,
    senhaMotorista,
    nascimentoMotorista,
    atualizarPerfilMotorista,
    vans,
    passageiros,
    motoristas,
  }
})
