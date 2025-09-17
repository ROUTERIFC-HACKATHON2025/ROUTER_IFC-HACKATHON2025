import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import PassageirosAPI from '@/api/passageiros'
import MotoristaAPI from '@/api/motorista'
import EnderecosAPI from '@/api/enderecos'

export const useUserDataStore = defineStore('userData', () => {
  const userData = ref(null)
  const userType = ref(null) // 'passageiro' ou 'motorista'
  const loading = ref(false)
  const error = ref(null)

  const passageirosAPI = new PassageirosAPI()
  const motoristasAPI = new MotoristaAPI()
  const enderecosAPI = new EnderecosAPI()

  // Buscar dados do usuário logado
  async function fetchUserData() {
    loading.value = true
    error.value = null

    try {
      // Primeiro, verificar qual tipo de usuário é
      const meResponse = await axios.get('http://localhost:8000/api/usuarios/me/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt_access')}` }
      })

      const userInfo = meResponse.data

      if (userInfo.is_passageiro) {
        userType.value = 'passageiro'
        // Buscar dados do passageiro pelo email
        const passageiros = await passageirosAPI.getPassageirosAll()
        const passageiro = passageiros.find(p => p.email === userInfo.email)

        if (passageiro) {
          // Buscar endereços do passageiro
          let enderecos = []
          if (passageiro.endereco && passageiro.endereco.length > 0) {
            try {
              const enderecosData = await enderecosAPI.getEnderecosAll()
              enderecos = enderecosData.filter(addr =>
                passageiro.endereco.includes(addr.idEndereco)
              )
            } catch (err) {
              console.error('Erro ao buscar endereços:', err)
            }
          }

          userData.value = {
            id: passageiro.idPassageiros,
            nome: passageiro.nome,
            telefone: passageiro.telefone,
            email: passageiro.email,
            senha: passageiro.senha,
            nascimento: passageiro.dataNascimento,
            cpf: passageiro.cpf,
            nomeResponsavel: passageiro.nomeResponsavel,
            cpfResponsavel: passageiro.cpfResponsavel,
            telefoneResponsavel: passageiro.telefoneResponsavel,
            endereco: passageiro.endereco || 'Endereço não informado',
            enderecos: enderecos
          }
        }
      } else if (userInfo.is_motorista) {
        userType.value = 'motorista'
        // Buscar dados do motorista pelo email
        const motoristas = await motoristasAPI.getMotoristasAll()
        const motorista = motoristas.find(m => m.email === userInfo.email)

        if (motorista) {
          userData.value = {
            id: motorista.idMotorista,
            nome: motorista.nome,
            telefone: motorista.telefone,
            email: motorista.email,
            senha: motorista.senha,
            cpf: motorista.cpf,
            codigoCnh: motorista.codigoCnh,
            empresa: motorista.empresa,
            endereco: 'Endereço do motorista' // Adicionar campo endereço se necessário
          }
        }
      }

    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err)
      error.value = 'Erro ao carregar dados do usuário'
    } finally {
      loading.value = false
    }
  }

  // Atualizar dados do usuário
  async function updateUserData(updatedData) {
    loading.value = true
    error.value = null

    try {
      if (userType.value === 'passageiro') {
        const passageiroData = {
          idPassageiros: userData.value.id,
          nome: updatedData.nome || userData.value.nome,
          telefone: updatedData.telefone || userData.value.telefone,
          email: updatedData.email || userData.value.email,
          senha: updatedData.senha || userData.value.senha,
          dataNascimento: updatedData.nascimento || userData.value.nascimento,
          cpf: updatedData.cpf || userData.value.cpf,
          nomeResponsavel: updatedData.nomeResponsavel || userData.value.nomeResponsavel,
          cpfResponsavel: updatedData.cpfResponsavel || userData.value.cpfResponsavel,
          telefoneResponsavel: updatedData.telefoneResponsavel || userData.value.telefoneResponsavel
        }

        const updatedPassageiro = await passageirosAPI.updatePassageiro(passageiroData)
        userData.value = { ...userData.value, ...updatedPassageiro }

      } else if (userType.value === 'motorista') {
        const motoristaData = {
          idMotorista: userData.value.id,
          nome: updatedData.nome || userData.value.nome,
          telefone: updatedData.telefone || userData.value.telefone,
          email: updatedData.email || userData.value.email,
          senha: updatedData.senha || userData.value.senha,
          cpf: updatedData.cpf || userData.value.cpf,
          codigoCnh: updatedData.codigoCnh || userData.value.codigoCnh,
          empresa: updatedData.empresa || userData.value.empresa
        }

        const updatedMotorista = await motoristasAPI.updateMotorista(motoristaData)
        userData.value = { ...userData.value, ...updatedMotorista }
      }

      return true
    } catch (err) {
      console.error('Erro ao atualizar dados do usuário:', err)
      error.value = 'Erro ao atualizar dados do usuário'
      return false
    } finally {
      loading.value = false
    }
  }

  // Adicionar novo endereço
  async function adicionarEndereco(enderecoData) {
    loading.value = true
    error.value = null

    try {
      if (userType.value === 'passageiro') {
        console.log('Criando endereço para passageiro:', userData.value.id)

        // Criar novo endereço
        const novoEndereco = await enderecosAPI.addEndereco(enderecoData)
        console.log('Endereço criado:', novoEndereco)

        // Obter endereços atuais do passageiro
        const enderecosAtuais = userData.value.enderecos || []
        const idsEnderecos = enderecosAtuais.map(addr => addr.idEndereco)
        idsEnderecos.push(novoEndereco.idEndereco)

        console.log('IDs de endereços para associar:', idsEnderecos)

        // Atualizar passageiro com novo endereço usando PATCH para atualizar apenas o campo endereco
        const response = await axios.patch(`http://localhost:8000/api/passageiros/${userData.value.id}/`, {
          endereco: idsEnderecos
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_access')}`
          }
        })

        console.log('Passageiro atualizado:', response.data)

        // Atualizar dados locais
        userData.value.enderecos = [...enderecosAtuais, novoEndereco]

        return true
      }
      return false
    } catch (err) {
      console.error('Erro ao adicionar endereço:', err)
      console.error('Detalhes do erro:', err.response?.data)
      error.value = 'Erro ao adicionar endereço'
      return false
    } finally {
      loading.value = false
    }
  }

  // Editar endereço existente
  async function editarEndereco(idEndereco, enderecoData) {
    loading.value = true
    error.value = null

    try {
      if (userType.value === 'passageiro') {
        // Atualizar endereço
        const enderecoAtualizado = await enderecosAPI.updateEndereco({
          idEndereco: idEndereco,
          ...enderecoData
        })

        // Atualizar dados locais
        const index = userData.value.enderecos.findIndex(addr => addr.idEndereco === idEndereco)
        if (index !== -1) {
          userData.value.enderecos[index] = enderecoAtualizado
        }

        return true
      }
      return false
    } catch (err) {
      console.error('Erro ao editar endereço:', err)
      error.value = 'Erro ao editar endereço'
      return false
    } finally {
      loading.value = false
    }
  }

  // Remover endereço
  async function removerEndereco(idEndereco) {
    loading.value = true
    error.value = null

    try {
      if (userType.value === 'passageiro') {
        console.log('Removendo endereço:', idEndereco, 'do passageiro:', userData.value.id)

        // Remover associação do passageiro
        const enderecosAtuais = userData.value.enderecos || []
        const idsEnderecos = enderecosAtuais
          .filter(addr => addr.idEndereco !== idEndereco)
          .map(addr => addr.idEndereco)

        console.log('IDs de endereços após remoção:', idsEnderecos)

        // Atualizar passageiro usando PATCH
        const response = await axios.patch(`http://localhost:8000/api/passageiros/${userData.value.id}/`, {
          endereco: idsEnderecos
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_access')}`
          }
        })

        console.log('Passageiro atualizado após remoção:', response.data)

        // Deletar endereço
        await enderecosAPI.deleteEndereco(idEndereco)

        // Atualizar dados locais
        userData.value.enderecos = enderecosAtuais.filter(addr => addr.idEndereco !== idEndereco)

        return true
      }
      return false
    } catch (err) {
      console.error('Erro ao remover endereço:', err)
      console.error('Detalhes do erro:', err.response?.data)
      error.value = 'Erro ao remover endereço'
      return false
    } finally {
      loading.value = false
    }
  }

  // Limpar dados do usuário (logout)
  function clearUserData() {
    userData.value = null
    userType.value = null
    error.value = null
  }

  return {
    userData,
    userType,
    loading,
    error,
    fetchUserData,
    updateUserData,
    adicionarEndereco,
    editarEndereco,
    removerEndereco,
    clearUserData
  }
})

