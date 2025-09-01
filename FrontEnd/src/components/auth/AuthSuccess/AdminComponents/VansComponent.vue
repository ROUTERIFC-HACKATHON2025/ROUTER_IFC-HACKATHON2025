<script setup>
import { ref, onMounted, computed } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAdminStore } from '@/stores/admin'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()
const admin = useAdminStore()

// Estado da busca
const termoBusca = ref('')

// Computed para filtrar vans
const vansFiltradas = computed(() => {
  if (!termoBusca.value.trim()) {
    return userProfile.vans
  }
  
  const busca = termoBusca.value.toLowerCase().trim()
  
  return userProfile.vans.filter(van => {
    // Buscar por nome (case-insensitive)
    if (van.nome.toLowerCase().includes(busca)) return true
    
    // Buscar por modelo (case-insensitive)
    if (van.modelo && van.modelo.toLowerCase().includes(busca)) return true
    
    // Buscar por marca (case-insensitive)
    if (van.marca && van.marca.toLowerCase().includes(busca)) return true
    
    // Buscar por placa (case-insensitive)
    if (van.placa && van.placa.toLowerCase().includes(busca)) return true
    
    // Buscar por características (case-insensitive)
    if (van.caracteristicas && van.caracteristicas.some(carac => 
      carac.toLowerCase().includes(busca)
    )) return true
    
    // Buscar por status (case-insensitive)
    const status = admin.getVanStatus(van.id)
    if (status.toLowerCase().includes(busca)) return true
    
    return false
  })
})

function abrirConfigVan(van) {
  // Aplicar o status persistido à van antes de selecioná-la
  const statusPersistido = admin.getVanStatus(van.id)
  van.status = statusPersistido
  admin.selectVan(van)
  authState.mudarAdminPage('configVans')
}

// Função para destacar termos de busca
function destacarTexto(texto, termo) {
  if (!termo || !texto) return texto
  
  const regex = new RegExp(`(${termo})`, 'gi')
  return texto.replace(regex, '<mark>$1</mark>')
}

// Inicializar status das vans quando o componente é montado
onMounted(() => {
  userProfile.vans.forEach(van => {
    const statusPersistido = admin.getVanStatus(van.id)
    van.status = statusPersistido
  })
})
</script>

<template>
  <section :style="{color: themeManager.text}">
    <h1 class="titulo" :style="{ color: themeManager.text }">
      PÁGINA DE 
      <span class="azul" :style="{ color: themeManager.detalheAlternativo }">
        GERENCIAMENTO <br> (NOME DA EMPRESA)
      </span>
    </h1>

    <p class="footer" :style="{ color: themeManager.text }">
      <button class="link" @click="authState.mudarState('inicio')" :style="{ color: themeManager.detalhe }">
        &larr; Voltar
      </button>
    </p>

    <div class="gerenciar" :style="{ borderColor: themeManager.detalhe }">
      <div class="header" :style="{backgroundColor: themeManager.detalhe}">
        <h2>GERENCIAR<br></br> TRANSPORTES</h2>
        <div class="search">
          <input 
            type="text" 
            placeholder="Pesquisar vans..." 
            v-model="termoBusca"
            :style="{
              backgroundColor: '#fff',
              color: '#000',
              border: '2px solid ' + themeManager.detalhe
            }"
          />
          <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
        </div>
      </div>

      <!-- Indicador de resultados da busca -->
      <div v-if="termoBusca.trim()" class="resultados-busca" :style="{ color: themeManager.text }">
        <p>
          {{ vansFiltradas.length }} van{{ vansFiltradas.length !== 1 ? 's' : '' }} encontrada{{ vansFiltradas.length !== 1 ? 's' : '' }}
          {{ vansFiltradas.length !== userProfile.vans.length ? ` de ${userProfile.vans.length}` : '' }}
          para "{{ termoBusca }}"
        </p>
      </div>

      <ul :style="{ borderColor: themeManager.detalhe, backgroundColor: '#fff', color: '#000' }">
        <li v-for="van in vansFiltradas" :key="van.id" class="card-van" :style="{ borderColor: themeManager.detalhe, backgroundColor: '#fff', color: '#000' }" @click="abrirConfigVan(van)">
          <div class="van-header">
            <span class="mdi mdi-van-passenger icone" :style="{ color: themeManager.detalhe }"></span>
            <span class="status-badge" :style="{ backgroundColor: admin.getVanStatus(van.id) === 'Ativo' ? '#4CAF50' : '#FF9800' }">{{ admin.getVanStatus(van.id) }}</span>
          </div>
          <h3 v-html="destacarTexto(van.nome, termoBusca)"></h3>
          <p class="modelo" v-html="destacarTexto(van.modelo, termoBusca)"></p>
          <p class="placa" v-html="destacarTexto(van.placa, termoBusca)"></p>
          <p class="capacidade">{{ van.acentos }} lugares</p>
          <div class="caracteristicas-preview">
            <span v-for="carac in van.caracteristicas.slice(0, 2)" :key="carac" class="carac-tag">{{ carac }}</span>
            <span v-if="van.caracteristicas.length > 2" class="carac-tag">+{{ van.caracteristicas.length - 2 }}</span>
          </div>
        </li>
        
        <!-- Mensagem quando nenhuma van é encontrada -->
        <li v-if="termoBusca.trim() && vansFiltradas.length === 0" class="nenhuma-van">
          <div class="nenhuma-van-content">
            <span class="mdi mdi-van-off" :style="{ color: themeManager.detalhe, fontSize: '4rem' }"></span>
            <h3>Nenhuma van encontrada</h3>
            <p>Tente usar termos diferentes na busca</p>
            <button class="btn-limpar-busca" @click="termoBusca = ''" :style="{ color: themeManager.detalhe }">
              Limpar busca
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>

.titulo {
  font-size: 3rem;
  margin: 30px 0 0px 0;
}

.link {
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 30px;
}

.gerenciar {
  margin-top: 30px;
    border: 1px solid ;
    border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px 20px 50px;
  border-radius: 8px 8px 0 0;
}

h2 {
    font-size: 2rem;
    text-align: left;
    color: #fff;
}

.search {
  position: relative;
  margin: 8px 0;
}

.search input {
  padding: 10px 38px 10px 15px;
  border-radius: 25px;
  width: 400px;
  font-size: 1rem;
  border: 2px solid;
}

.search input:focus {
  outline: none;
}

.search .mdi {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3em;
  pointer-events: none;
  transition: transform 0.3s ease;
}

.search input:focus+.mdi {
  transform: translateY(-50%) scale(1.2);
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px 100px;
  list-style: none;
  padding: 50px 120px 50px 120px;
}

.card-van {
  cursor: pointer;
  border: 1px solid;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}

.card-van:hover {
  transform: scale(1.05);
}

.van-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0px;
  border-bottom: 2px solid;
}

.icone {
  font-size: 100px;
}

.status-badge {
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.card-van h3 {
  text-align: center;
  font-weight: bold;
  margin: 10px 0;
  font-size: 1.2rem;
  color: inherit;
}

.modelo {
  font-size: 0.9rem;
  margin: 5px 0;
  opacity: 0.8;
  border-bottom: 1px solid;
}

.placa {
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
  border-bottom: 1px solid;
}

.capacidade {
  font-size: 0.9rem;
  margin: 5px 0;
  opacity: 0.7;
  border-bottom: 1px solid;
}

.caracteristicas-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-top: 10px;

}

.carac-tag {
  color: inherit;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
}

.resultados-busca {
  padding: 10px 20px;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
}

.resultados-busca p {
  margin: 0;
}

.nenhuma-van {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 20px;
}

.nenhuma-van-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.nenhuma-van-content h3 {
  margin: 0;
  font-size: 1.5rem;
  color: inherit;
}

.nenhuma-van-content p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.7;
}

.btn-limpar-busca {
  background: none;
  border: 1px solid;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-limpar-busca:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Estilo para destacar termos de busca */
mark {
  background-color: #FFD700;
  color: #000;
  padding: 1px 3px;
  border-radius: 3px;
  font-weight: bold;
}
</style>
