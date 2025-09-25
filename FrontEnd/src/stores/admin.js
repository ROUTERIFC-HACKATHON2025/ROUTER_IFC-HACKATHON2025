import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import AdminAPI from '@/api/admin'

export const useAdminStore = defineStore('admin', () => {
  const selectedVan = ref(null)
  const assignments = ref({})
  const vanStatus = ref({})
  const rotaEmEdicao = ref(null)
  const rotasEditadas = ref({})
  const carregando = ref(false)
  const erroCarregamento = ref(null)

  const STORAGE_KEY = 'adminAssignments'
  const STATUS_STORAGE_KEY = 'vanStatus'
  const ROTAS_STORAGE_KEY = 'rotasEditadas'

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') {
          assignments.value = parsed
        }
      }
    } catch (e) { void e }
    
    try {
      const statusRaw = localStorage.getItem(STATUS_STORAGE_KEY)
      if (statusRaw) {
        const statusParsed = JSON.parse(statusRaw)
        if (statusParsed && typeof statusParsed === 'object') {
          vanStatus.value = statusParsed
        }
      }
    } catch (e) { void e }

    try {
      const rotasRaw = localStorage.getItem(ROTAS_STORAGE_KEY)
      if (rotasRaw) {
        const rotasParsed = JSON.parse(rotasRaw)
        if (rotasParsed && typeof rotasParsed === 'object') {
          rotasEditadas.value = rotasParsed
        }
      }
    } catch (e) { void e }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments.value))
    } catch (e) { void e }
  }

  function persistStatus() {
    try {
      localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(vanStatus.value))
    } catch (e) { void e }
  }

  function persistRotas() {
    try {
      localStorage.setItem(ROTAS_STORAGE_KEY, JSON.stringify(rotasEditadas.value))
    } catch (e) { void e }
  }

  loadFromStorage()

  function initializeVanStatus() {
    import('@/stores/userProfile').then(({ useUserProfileStore }) => {
      const userProfile = useUserProfileStore()
      userProfile.vans.forEach(van => {
        if (!vanStatus.value[van.id]) {
          vanStatus.value[van.id] = 'Ativo'
        }
      })
      persistStatus()
    }).catch(() => {
    })
  }

  initializeVanStatus()

  const currentAssignment = computed(() => {
    if (!selectedVan.value) return { driver: null, passengers: [] }
    const id = selectedVan.value.id
    if (!assignments.value[id]) {
      assignments.value[id] = { driver: null, passengers: [] }
    }
    return assignments.value[id]
  })

  const vanPassengers = computed(() => currentAssignment.value.passengers || [])
  const selectedDriver = computed(() => currentAssignment.value.driver || null)

  const capacidadeRestante = computed(() => {
    if (!selectedVan.value) return Infinity
    const capacidade = selectedVan.value.acentos ?? 0
    return capacidade - vanPassengers.value.length
  })

  function selectVan(van) {
    if (van) {
      const statusPersistido = getVanStatus(van.id)
      van.status = statusPersistido
    }
    
    selectedVan.value = van
    const id = van?.id
    if (id !== undefined) {
      // Sempre inicializa com array vazio para evitar passageiros pré-definidos
      if (!assignments.value[id]) {
        assignments.value[id] = { driver: null, passengers: [] }
      } else {
        // Garante que não há passageiros pré-definidos
        assignments.value[id] = { 
          driver: assignments.value[id].driver || null, 
          passengers: assignments.value[id].passengers || [] 
        }
      }
      // Força limpeza de dados pré-definidos para esta van específica
      clearPredefinedDataForVan(id)
      persist()
    }
  }

  function clearPredefinedDataForVan(vanId) {
    const assn = assignments.value[vanId]
    if (assn && assn.passengers && assn.passengers.length > 0) {
      // Verifica se são dados pré-definidos
      const hasPredefinedPassengers = assn.passengers.some(p => 
        p.id === 0 || p.id === 1 || p.id === 2 || p.id === 3 || p.id === 4 ||
        p.nome === 'Ana Luiza' || p.nome === 'Maria Fernanda Santos' ||
        p.nome === 'Carlos Eduardo Oliveira' || p.nome === 'Juliana Pereira Costa' ||
        p.nome === 'Rafael Lima Andrade' || p.nome === 'Fernanda Alves Rodrigues'
      )
      if (hasPredefinedPassengers) {
        assignments.value[vanId] = { driver: assn.driver || null, passengers: [] }
        persist()
      }
    }
  }

  function addPassenger(passageiro) {
    if (!selectedVan.value) return
    if (selectedVan.value.status === 'Manutenção') {
      alert('Não é possível adicionar passageiros a uma van em manutenção.')
      return
    }
    const alvoId = selectedVan.value.id
    
    // Remove passageiro de outras vans se já estiver em alguma
    for (const [vanId, assn] of Object.entries(assignments.value)) {
      if ((assn.passengers || []).some(p => p.id === passageiro.id)) {
        assignments.value[vanId] = {
          ...assn,
          passengers: (assn.passengers || []).filter(p => p.id !== passageiro.id)
        }
      }
    }
    
    // Adiciona à van atual
    const assnAtual = currentAssignment.value
    if (capacidadeRestante.value <= 0) {
      alert('Capacidade da van atingida.')
      return
    }
    
    // Verifica se já não está na van atual
    if ((assnAtual.passengers || []).some(p => p.id === passageiro.id)) {
      return
    }
    
    const novaLista = [...(assnAtual.passengers || []), passageiro]
    assignments.value[alvoId] = { ...assnAtual, passengers: novaLista }
    persist()
  }

  function removePassenger(passageiroId) {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    const novaLista = (assn.passengers || []).filter(p => p.id !== passageiroId)
    assignments.value[selectedVan.value.id] = { ...assn, passengers: novaLista }
    persist()
  }

  function isPassengerAdded(passageiroId) {
    if (!selectedVan.value) return false
    const assn = assignments.value[selectedVan.value.id]
    return (assn?.passengers || []).some(p => p.id === passageiroId)
  }

  function selectDriver(motorista) {
    if (!selectedVan.value) return
    if (selectedVan.value.status === 'Manutenção') {
      alert('Não é possível atribuir motoristas a uma van em manutenção.')
      return
    }
    const alvoId = selectedVan.value.id
    
    // Remove motorista de outras vans se já estiver em alguma
    for (const [vanId, assn] of Object.entries(assignments.value)) {
      if (assn.driver && assn.driver.id === motorista.id) {
        assignments.value[vanId] = { ...assn, driver: null }
      }
    }
    
    // Adiciona à van atual
    const assnAtual = currentAssignment.value
    assignments.value[alvoId] = { ...assnAtual, driver: motorista }
    persist()
  }

  function clearDriver() {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    assignments.value[selectedVan.value.id] = { ...assn, driver: null }
    persist()
  }

  function clearAllPassengers() {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    assignments.value[selectedVan.value.id] = { ...assn, passengers: [] }
    persist()
  }

  function clearPredefinedData() {
    // Limpa dados pré-definidos de todas as vans
    Object.keys(assignments.value).forEach(vanId => {
      const assn = assignments.value[vanId]
      if (assn && assn.passengers && assn.passengers.length > 0) {
        // Verifica se são dados pré-definidos (baseado em IDs específicos ou outros critérios)
        const hasPredefinedPassengers = assn.passengers.some(p => 
          p.id === 0 || p.id === 1 || p.id === 2 || p.id === 3 || p.id === 4 ||
          p.nome === 'Ana Luiza' || p.nome === 'Maria Fernanda Santos' ||
          p.nome === 'Carlos Eduardo Oliveira' || p.nome === 'Juliana Pereira Costa' ||
          p.nome === 'Rafael Lima Andrade' || p.nome === 'Fernanda Alves Rodrigues'
        )
        if (hasPredefinedPassengers) {
          assignments.value[vanId] = { driver: assn.driver || null, passengers: [] }
        }
      }
    })
    // Limpa também as rotas editadas
    Object.keys(rotasEditadas.value).forEach(vanId => {
      const rotas = rotasEditadas.value[vanId]
      if (rotas) {
        Object.keys(rotas).forEach(tipoRota => {
          if (rotas[tipoRota] && rotas[tipoRota].length > 0) {
            const hasPredefinedPassengers = rotas[tipoRota].some(p => 
              p.id === 0 || p.id === 1 || p.id === 2 || p.id === 3 || p.id === 4 ||
              p.nome === 'Ana Luiza' || p.nome === 'Maria Fernanda Santos' ||
              p.nome === 'Carlos Eduardo Oliveira' || p.nome === 'Juliana Pereira Costa' ||
              p.nome === 'Rafael Lima Andrade' || p.nome === 'Fernanda Alves Rodrigues'
            )
            if (hasPredefinedPassengers) {
              rotas[tipoRota] = []
            }
          }
        })
      }
    })
    persist()
    persistRotas()
  }

  watch(assignments, persist, { deep: true })
  
  watch(vanStatus, persistStatus, { deep: true })

  watch(rotasEditadas, persistRotas, { deep: true })

  function getDriverVanId(motoristaId) {
    for (const [vanId, assn] of Object.entries(assignments.value)) {
      if (assn.driver && assn.driver.id === motoristaId) {
        return Number(vanId)
      }
    }
    return null
  }

  function isDriverAssigned(motoristaId) {
    if (!selectedVan.value) return false
    const assn = assignments.value[selectedVan.value.id]
    return assn?.driver?.id === motoristaId
  }

  function updateVanStatus(status) {
    if (selectedVan.value) {
      const vanId = selectedVan.value.id
      selectedVan.value.status = status
      vanStatus.value[vanId] = status
      
      // Se colocar em manutenção, remove todos os passageiros
      if (status === 'Manutenção') {
        const assn = assignments.value[vanId]
        if (assn) {
          assignments.value[vanId] = { ...assn, passengers: [], driver: null }
          persist()
        }
      }
      
      persistStatus()
    }
  }

  function getVanStatus(vanId) {
    return vanStatus.value[vanId] || 'Ativo'
  }

  function setRotaEmEdicao(rota) {
    rotaEmEdicao.value = rota
  }

  function setPassengers(passageiros) {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    assignments.value[selectedVan.value.id] = { ...assn, passengers: passageiros }
    persist()
  }

  function salvarRotaEditada(tipoRota, passageiros) {
    if (!selectedVan.value) return
    
    const vanId = selectedVan.value.id
    if (!rotasEditadas.value[vanId]) {
      rotasEditadas.value[vanId] = { ida: [], volta12: [], volta17: [] }
    }
    
    rotasEditadas.value[vanId][tipoRota] = [...passageiros]
    persistRotas()
  }

  function getRotaEditada(tipoRota) {
    if (!selectedVan.value) return []
    
    const vanId = selectedVan.value.id
    if (!rotasEditadas.value[vanId]) {
      rotasEditadas.value[vanId] = { ida: [], volta12: [], volta17: [] }
    }
    
    return rotasEditadas.value[vanId][tipoRota] || []
  }

  async function loadBackendData() {
    carregando.value = true
    erroCarregamento.value = null
    try {
      const api = new AdminAPI()
      const { passageiros, motoristas } = await api.fetchAll()

      const passageirosMapeados = (Array.isArray(passageiros) ? passageiros : []).map((p) => ({
        id: p.idPassageiros ?? p.id ?? p.pk ?? null,
        nome: p.nome ?? '',
        nascimento: p.dataNascimento ?? p.nascimento ?? '',
        cpf: p.cpf ?? '',
        email: p.email ?? '',
        telefone: p.telefone ?? '',
        endereco: Array.isArray(p.endereco) && p.endereco.length > 0 ? String(p.endereco[0]) : (p.endereco ?? ''),
        descricao: p.descricao ?? '',
      }))

      const motoristasMapeados = (Array.isArray(motoristas) ? motoristas : []).map((m) => ({
        id: m.idMotorista ?? m.id ?? m.pk ?? null,
        nome: m.nome ?? '',
        nascimento: m.dataNascimento ?? m.nascimento ?? '',
        cpf: m.cpf ?? '',
        email: m.email ?? '',
        telefone: m.telefone ?? '',
        endereco: m.endereco ?? '',
        descricao: m.descricao ?? '',
      }))

      const { useUserProfileStore } = await import('@/stores/userProfile')
      const userProfile = useUserProfileStore()
      userProfile.passageiros = passageirosMapeados
      userProfile.motoristas = motoristasMapeados
    } catch (e) {
      erroCarregamento.value = e?.message ?? String(e)
    } finally {
      carregando.value = false
    }
  }

  return {
    selectedVan,
    vanPassengers,
    selectedDriver,
    capacidadeRestante,
    rotaEmEdicao,
    rotasEditadas,
    carregando,
    erroCarregamento,
    selectVan,
    addPassenger,
    removePassenger,
    isPassengerAdded,
    selectDriver,
    clearDriver,
    clearAllPassengers,
    clearPredefinedData,
    clearPredefinedDataForVan,
    getDriverVanId,
    isDriverAssigned,
    updateVanStatus,
    getVanStatus,
    setRotaEmEdicao,
    setPassengers,
    salvarRotaEditada,
    getRotaEditada,
    loadBackendData,
  }
})


