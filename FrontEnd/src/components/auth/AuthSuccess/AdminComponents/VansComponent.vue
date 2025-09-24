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

const termoBusca = ref('')

const vansFiltradas = computed(() => {
  if (!termoBusca.value.trim()) {
    return userProfile.vans
  }
  
  const busca = termoBusca.value.toLowerCase().trim()
  
  return userProfile.vans.filter(van => {
    if (van.nome.toLowerCase().includes(busca)) return true
    
    if (van.modelo && van.modelo.toLowerCase().includes(busca)) return true
    
    if (van.marca && van.marca.toLowerCase().includes(busca)) return true
    
    if (van.placa && van.placa.toLowerCase().includes(busca)) return true
    
    if (van.caracteristicas && van.caracteristicas.some(carac => 
      carac.toLowerCase().includes(busca)
    )) return true
    
    const status = admin.getVanStatus(van.id)
    if (status.toLowerCase().includes(busca)) return true
    
    return false
  })
})

function abrirConfigVan(van) {
  const statusPersistido = admin.getVanStatus(van.id)
  van.status = statusPersistido
  admin.selectVan(van)
  authState.mudarAdminPage('configVans')
}

function destacarTexto(texto, termo) {
  if (!termo || !texto) return texto
  
  const regex = new RegExp(`(${termo})`, 'gi')
  return texto.replace(regex, '<mark>$1</mark>')
}

onMounted(() => {
  userProfile.vans.forEach(van => {
    const statusPersistido = admin.getVanStatus(van.id)
    van.status = statusPersistido
  })
})
</script>
<template>
  <section :style="{color: themeManager.text}">
    <!-- Tabs -->
    <div class="tabs" :style="{ backgroundColor: themeManager.detalhe }">
      <h1 style=" color: #fff;">GERENCIAMENTO</h1>
      <button @click="authState.mudarState('inicio')" :style="{ color: themeManager.detalhe }">Sair da Pagina</button>
    </div>

    <!-- Caixa de gerenciamento -->
    <div class="gerenciar" :style="{ backgroundColor: themeManager.fundo }">
      <div class="header-actions">

        <div class="search">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            v-model="termoBusca"
            :style="{ borderColor: themeManager.detalhe, color: themeManager.text, backgroundColor: themeManager.fundo }"
          />
          <span class="mdi mdi-magnify" aria-hidden="true"></span>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="termoBusca.trim()" class="resultados-busca">
        <p>
          {{ vansFiltradas.length }} van{{ vansFiltradas.length !== 1 ? 's' : '' }} encontrada{{ vansFiltradas.length !== 1 ? 's' : '' }}
          {{ vansFiltradas.length !== userProfile.vans.length ? ` de ${userProfile.vans.length}` : '' }}
          para "{{ termoBusca }}"
        </p>
      </div>

      <!-- Grid de vans -->
      <ul>
        <li 
          v-for="van in vansFiltradas" 
          :key="van.id" 
          class="card-van"
          @click="abrirConfigVan(van)"
          :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }"
        >
          <span class="mdi mdi-van-passenger icone" style="color: #fff;"></span>
          <div >
            <h3 v-html="destacarTexto(van.nome, termoBusca)" style="color: #fff;"></h3>
          <p class="placa" v-html="destacarTexto(van.placa, termoBusca)" style="color: #fff;"></p>
          </div>
        </li>

        <!-- Caso não tenha resultados -->
        <li v-if="termoBusca.trim() && vansFiltradas.length === 0" class="nenhuma-van">
          <div class="nenhuma-van-content">
            <span class="mdi mdi-van-off"></span>
            <h3>Nenhuma van encontrada</h3>
            <p>Tente usar termos diferentes na busca</p>
            <button class="btn-limpar-busca" @click="termoBusca = ''">
              Limpar busca
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 60px 100px 100px 100px;
}

.tabs {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 0px;
  padding: 20px 40px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  border-radius: 10px 10px 0 0;
}

.tabs h1 {
  font-size: 2.5rem;
}

.tabs button {
  border: none;
  padding: 5px 25px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gerenciar {
  border-radius: 0 0 10px 10px;
  padding: 20px 30px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

.header-actions {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
}

.btn-cadastrar {
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search {
  position: relative;
}

.search input {
  padding: 8px 38px 8px 15px;
  border-radius: 25px;
  width: 400px;
  font-size: 1rem;
  border: 2px solid;
}

.search input:focus {
  outline: none;
  border-color: #002f6c;
}

.search .mdi {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3em;
  color: #002f6c;
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  list-style: none;
  padding: 20px 0;
  justify-items: center;
}

.card-van {
  display: flex;
  cursor: pointer;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  border-radius: 10px;
  padding: 0 40px 0 40px;
  align-items: center;
  text-align: left;
  background: #fff;
  min-width: 320px;
  max-width: 320px;
  display: flex;
  transition: transform 0.2s ease;
}

.card-van:hover {
  transform: scale(1.05);
}

.icone {
  font-size: 90px;
  margin-bottom: 10px;
  margin-right: 20px;
}

.card-van h3 {
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
}

.placa {
  font-size: 0.9rem;
  color: #444;
}

.resultados-busca {
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 15px;
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

.nenhuma-van-content .mdi {
  font-size: 3rem;
  color: #002f6c;
}

.btn-limpar-busca {
  background: none;
  border: 1px solid #002f6c;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-limpar-busca:hover {
  background-color: rgba(0, 47, 108, 0.1);
}
</style>
