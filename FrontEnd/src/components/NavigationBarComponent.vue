<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()
const router = useRouter()
onMounted(themeManager.init)

const showHeader = ref(true)
let lastScroll = 0
let headerHeight = 0

const menuAberto = ref(false)
const dragging = ref(false)
const dragOffset = ref(0)
const overlayOpacity = ref(1)

function abrirMenu() {
  menuAberto.value = true
  dragOffset.value = 0
  overlayOpacity.value = 1
}
function fecharMenu() {
  menuAberto.value = false
  dragOffset.value = 0
  overlayOpacity.value = 0
}

let startX = 0
function handleTouchStart(event) {
  if (!menuAberto.value) return
  startX = event.touches[0].clientX
  dragging.value = true
}
function handleTouchMove(event) {
  if (!dragging.value) return
  const currentX = event.touches[0].clientX
  const diffX = startX - currentX
  if (diffX > 0) {
    dragOffset.value = Math.min(diffX, window.innerWidth * 0.75)
    overlayOpacity.value = 1 - (dragOffset.value / (window.innerWidth * 0.75))
  }
}
function handleTouchEnd() {
  if (!dragging.value) return
  dragging.value = false
  if (dragOffset.value > 50) {
    fecharMenu()
  } else {
    dragOffset.value = 0
    overlayOpacity.value = 1
  }
}

const searchQuery = ref('')
const showSearchResults = ref(false)
const searchResults = ref([])
const isLoading = ref(false)
const selectedIndex = ref(-1)
const isMobile = ref(window.innerWidth < 768)

const searchData = ref({
  paginas: [
    { id: 1, nome: 'Início', descricao: 'Página principal do site', tipo: 'pagina', rota: '/' },
    { id: 2, nome: 'Sobre Nós', descricao: 'Conheça mais sobre o projeto', tipo: 'pagina', rota: '/SobreNos' },
    { id: 3, nome: 'Equipe', descricao: 'Nossa equipe de desenvolvimento', tipo: 'pagina', rota: '/equipe' },
    { id: 4, nome: 'Empresas', descricao: 'Empresas parceiras de transporte', tipo: 'pagina', rota: '/Empresa' },
    { id: 5, nome: 'Login', descricao: 'Acesse sua conta', tipo: 'pagina', rota: '/login' },
    { id: 6, nome: 'Cadastro Motorista', descricao: 'Crie sua conta', tipo: 'pagina', rota: '/Register', alterar: 'Motorista' },
    { id: 7, nome: 'Cadastro Passageiro', descricao: 'Crie sua conta', tipo: 'pagina', rota: '/Register', alterar: 'Passageiro' }
  ],
  empresas: [
    { id: 1, nome: 'Indy Tour', descricao: 'Empresa de transporte executivo', tipo: 'empresa', rota: '/IndySul', alterar: 'Indy' },
    { id: 2, nome: 'Sul Turismo', descricao: 'Transporte escolar de qualidade', tipo: 'empresa', rota: '/IndySul', alterar: 'Sul' }
  ]
})

function handleScroll() {
  const currentScroll = window.scrollY
  showHeader.value = currentScroll < lastScroll || currentScroll < headerHeight
  lastScroll = currentScroll
}

function performSearch() {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) {
    searchResults.value = []
    showSearchResults.value = false
    return
  }
  isLoading.value = true
  setTimeout(() => {
    const results = [...searchData.value.paginas, ...searchData.value.empresas]
      .filter(item => item.nome.toLowerCase().includes(query))
    searchResults.value = results
    showSearchResults.value = true
    isLoading.value = false
    selectedIndex.value = -1
  }, 200)
}

watch(searchQuery, (newQuery) => {
  if (newQuery.trim()) performSearch()
  else {
    searchResults.value = []
    showSearchResults.value = false
    selectedIndex.value = -1
  }
})

function handleSearchKeydown(event) {
  if (!showSearchResults.value || searchResults.value.length === 0) return
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = (selectedIndex.value + 1) % searchResults.value.length
      scrollToSelected()
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = (selectedIndex.value - 1 + searchResults.value.length) % searchResults.value.length
      scrollToSelected()
      break
    case 'Enter':
      if (selectedIndex.value >= 0) {
        navigateToResult(searchResults.value[selectedIndex.value])
        selectedIndex.value = -1
      } else {
        performSearch()
      }
      break
    case 'Escape':
      showSearchResults.value = false
      selectedIndex.value = -1
      break
  }
}

function scrollToSelected() {
  const container = document.querySelector('.search-results')
  if (!container || selectedIndex.value < 0) return
  const item = container.children[selectedIndex.value]
  if (item) item.scrollIntoView({ block: 'nearest' })
}

function navigateToResult(result) {
  showSearchResults.value = false
  searchQuery.value = ''
  selectedIndex.value = -1
  if (result.rota) {
    if (result.tipo === 'empresa' && result.alterar) {
      router.push({ path: result.rota, query: { empresa: result.alterar } })
    } else router.push(result.rota)
  }
}

function handleClickOutside(event) {
  const searchContainer = document.querySelector('.search')
  if (searchContainer && !searchContainer.contains(event.target)) {
    showSearchResults.value = false
    selectedIndex.value = -1
  }
}

function handleResize() {
  isMobile.value = window.innerWidth < 768
  const headerEl = document.querySelector(isMobile.value ? '.celular' : '.notebook')
  if (headerEl) headerHeight = headerEl.offsetHeight

  // Forçar animação na mudança de tela
  showHeader.value = false
  setTimeout(() => showHeader.value = true, 50)
}

watch(isMobile, () => {
  showHeader.value = false
  setTimeout(() => showHeader.value = true, 50)
})

onMounted(() => {
  const headerEl = document.querySelector(isMobile.value ? '.celular' : '.notebook')
  if (headerEl) headerHeight = headerEl.offsetHeight

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)

  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchmove', handleTouchMove)
  window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)

  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <div v-if="menuAberto"
       class="menu-overlay"
       @click="fecharMenu"
       :style="{ opacity: overlayOpacity }"></div>

  <div class="notebook" :class="showHeader ? 'animate-slideDown' : 'animate-slideUp'">
    <div class="top-bar" :style="{ backgroundColor: themeManager.detalhe }">
      <p>Transporte escolar para o IFC de forma segura e fácil.</p>
      <span :class="themeManager.icone" @click="themeManager.toggleTheme"></span>
    </div>

    <header :style="{ backgroundColor: themeManager.fundo }">
      <div class="container"
           :style="{ backgroundColor: themeManager.fundo, borderBottom: '2px solid ' + themeManager.detalhe }">
        <div class="logo">
          <RouterLink to="/">
            <img :src="themeManager.logo" alt="Logotipo ROUTER" />
            <p :style="{ color: themeManager.text, borderLeft: '2px solid ' + themeManager.text }">
              Sua rota<br /><span>mais segura</span>
            </p>
          </RouterLink>
        </div>

        <div class="search" :style="{ color: themeManager.text }">
          <input v-model="searchQuery"
                 @keydown="handleSearchKeydown"
                 type="text"
                 placeholder="Pesquisar páginas, empresas..."
                 :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, border: '2px solid ' + themeManager.detalhe }" />
          <span class="mdi mdi-magnify" :style="{ color: themeManager.detalhe }"></span>
          <div v-if="isLoading" class="search-loading"><div class="spinner"></div></div>
          <div v-if="showSearchResults && searchResults.length > 0" class="search-results"
               :style="{ backgroundColor: themeManager.fundo, borderColor: themeManager.detalhe }">
            <div v-for="(result, index) in searchResults"
                 :key="`${result.tipo}-${result.id}`"
                 class="search-result-item"
                 :class="{ 'selected': index === selectedIndex }"
                 @click="navigateToResult(result)"
                 @mouseenter="selectedIndex = index">
              <div class="result-content">
                <div class="result-title">{{ result.nome }}</div>
                <div class="result-subtitle">{{ result.descricao }} <span v-if="result.alterar" class="result-alterar">({{ result.alterar }})</span></div>
              </div>
            </div>
          </div>
          <div v-if="showSearchResults && searchResults.length === 0 && searchQuery.trim()" class="search-no-results"
               :style="{ backgroundColor: themeManager.fundo, borderColor: themeManager.detalhe }">
            <span class="mdi mdi-magnify-close" :style="{ color: themeManager.detalhe }"></span>
            <p :style="{ color: themeManager.text }">Nenhum resultado encontrado</p>
          </div>
        </div>

        <nav aria-label="Menu principal">
          <ul>
            <li><RouterLink to="/" :style="{ color: themeManager.text }">Início</RouterLink></li>
            <li><RouterLink to="/SobreNos" :style="{ color: themeManager.text }">Sobre</RouterLink></li>
            <li><RouterLink to="/equipe" :style="{ color: themeManager.text }">Equipe</RouterLink></li>
            <li><RouterLink to="/Empresa" :style="{ color: themeManager.text }">Empresas</RouterLink></li>
            <li><RouterLink to="/login"><span class="mdi mdi-account" :style="{ color: themeManager.text }"></span></RouterLink></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>

  <div class="celular" :class="showHeader ? 'animate-slideDown' : 'animate-slideUp'">
    <header :style="{ backgroundColor: themeManager.fundo }">
      <div class="container"
           :style="{ backgroundColor: themeManager.fundo, borderBottom: '2px solid ' + themeManager.detalhe }">
        <div class="logo-bar">
          <RouterLink to="/">
            <img :src="themeManager.logo" alt="Logotipo ROUTER" />
            <p :style="{ color: themeManager.text, borderLeft: '2px solid ' + themeManager.text }">Sua rota<br /><span>mais segura</span></p>
          </RouterLink>
          <div><span class="mdi mdi-view-headline" @click="abrirMenu" :style="{ color: themeManager.text }"></span></div>
        </div>

        <div class="search" :style="{ color: themeManager.text }">
          <input v-model="searchQuery"
                 @keydown="handleSearchKeydown"
                 type="text"
                 placeholder="Pesquisar páginas, empresas..."
                 :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, border: '2px solid ' + themeManager.detalhe }" />
          <span class="mdi mdi-magnify" :style="{ color: themeManager.detalhe }"></span>
          <div v-if="isLoading" class="search-loading"><div class="spinner"></div></div>
          <div v-if="showSearchResults && searchResults.length > 0" class="search-results mobile"
               :style="{ backgroundColor: themeManager.fundo, borderColor: themeManager.detalhe }">
            <div v-for="(result, index) in searchResults"
                 :key="`${result.tipo}-${result.id}`"
                 class="search-result-item"
                 :class="{ 'selected': index === selectedIndex }"
                 @click="navigateToResult(result)"
                 @mouseenter="selectedIndex = index">
              <div class="result-content">
                <div class="result-title">{{ result.nome }}</div>
                <div class="result-subtitle">{{ result.descricao }} <span v-if="result.alterar" class="result-alterar">({{ result.alterar }})</span></div>
              </div>
            </div>
          </div>
          <div v-if="showSearchResults && searchResults.length === 0 && searchQuery.trim()" class="search-no-results mobile"
               :style="{ backgroundColor: themeManager.fundo, borderColor: themeManager.detalhe }">
            <span class="mdi mdi-magnify-close" :style="{ color: themeManager.detalhe }"></span>
            <p :style="{ color: themeManager.text }">Nenhum resultado</p>
          </div>
        </div>
      </div>

      <nav class="menu-mobile"
           :class="{ 'menu-aberto': menuAberto, dragging: dragging }"
           :style="{ right: menuAberto ? `-${dragOffset}px` : '-100%', backgroundColor: themeManager.fundo }">
        <div class="menu-top">
          <RouterLink to="/login" @click="fecharMenu"><span class="mdi mdi-account" :style="{ color: themeManager.text }"></span></RouterLink>
          <span class="mdi mdi-close-outline" @click="fecharMenu" :style="{ color: themeManager.text }"></span>
        </div>
        <ul>
          <li><RouterLink to="/" :style="{ color: themeManager.text }" @click="fecharMenu">Início</RouterLink></li>
          <li><RouterLink to="/SobreNos" :style="{ color: themeManager.text }" @click="fecharMenu">Sobre</RouterLink></li>
          <li><RouterLink to="/equipe" :style="{ color: themeManager.text }" @click="fecharMenu">Equipe</RouterLink></li>
          <li><RouterLink to="/Empresa" :style="{ color: themeManager.text }" @click="fecharMenu">Empresas</RouterLink></li>
        </ul>
        <span :class="themeManager.icone"
              :style="{ color: themeManager.text }"
              @click="themeManager.toggleTheme"></span>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.menu-mobile {
  position: fixed;
  top: 0;
  right: -100%;
  width: 75%;
  height: 100%;
  z-index: 1000;
  padding: 20px;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
}
.menu-aberto { right: 0; min-height: 100vh; }
.menu-mobile.dragging { transition: none !important; }

.search-result-item.selected {
  background-color: rgba(78, 70, 229, 0.082);
  color: #1863A2;
}

.notebook,
.celular {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: all 0.5s ease;
  opacity: 1;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 5vw;
  color: #e4e4e4;
  font-weight: 600;
  font-size: 0.85rem;
}

.top-bar p {
  font-size: 1em;
}

.top-bar span {
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.top-bar span:hover {
  transform: rotate(20deg) scale(1.2);
  color: #fff;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 0;
  margin: 0 120px;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.logo img {
  width: 90px;
  height: auto;
}

.logo p {
  font-size: 1rem;
  margin: 0;
  padding-left: 8px;
  line-height: 1.2;
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

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid;
  border-top: none;
  border-radius: 0 0 15px 15px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-results.mobile {
  position: fixed;
  top: 130px;
  left: 20px;
  right: 20px;
  border-radius: 0 0 15px 15px;
  max-height: 300px;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-result-item:hover {
  background-color: rgba(78, 70, 229, 0.082);
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-icon {
  margin-right: 15px;
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.result-content {
  flex: 1;
}

.result-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
}

.result-subtitle {
  font-size: 0.85rem;
  opacity: 0.8;
}

.result-alterar {
  font-weight: 600;
  color: inherit;
  margin-left: 8px;
}

.result-type {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.1);
}

.search-loading {
  position: absolute;
  right: 45px;
  top: 50%;
  transform: translateY(-50%);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 200ms linear infinite; 
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg); 
  }
  50% {
    transform: rotate(180deg); 
  }
  75% {
    transform: rotate(270deg); 
  }
  100% {
    transform: rotate(360deg); 
  }
}

.search-no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid;
  border-top: none;
  border-radius: 0 0 15px 15px;
  padding: 20px;
  text-align: center;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-no-results.mobile {
  position: fixed;
  top: 130px;
  left: 20px;
  right: 20px;
  border-radius: 0 0 15px 15px;
}

.search-no-results .mdi {
  font-size: 2rem;
  margin-bottom: 10px;
  display: block;
}

.search-no-results p {
  margin: 0;
  font-size: 0.9rem;
}

nav ul {
  display: flex;
  gap: 18px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  flex-wrap: wrap;
}

nav ul li {
  transition: all 0.3s ease;
}

nav ul li:hover {
  transform: scale(1.05);
}

nav ul li a {
  font-size: 1.1em;
  text-decoration: none;
  padding: 5px 8px;
  border-radius: 5px;
  font-weight: 500;
}

nav ul li a:hover {
  text-decoration: underline;
}

nav ul li a span {
  font-size: 2em;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.animate-slideDown {
  animation: slideDown 0.6s ease forwards;
}

.animate-slideUp {
  animation: slideUp 0.6s ease forwards;
}

.menu-mobile {
  position: fixed;
  top: 0;
  right: -100%;
  width: 75%;
  height: 100%;
  z-index: 1000;
  padding: 20px;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
}

.menu-aberto {
  right: 0;
  min-height: 100vh;
}

.menu-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-mobile .mdi {
  font-size: 2rem;
}

.menu-mobile ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.menu-mobile ul li {
  margin: 5px 0;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .container {
    margin: 0 20px;
    display: block;
  }

  .logo-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    gap: 0px;
  }

  .logo-bar a {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .logo-bar img {
    width: 100px;
    height: auto;
  }

  .logo-bar p {
    font-size: 0.8rem;
    margin: 0;
    padding-left: 8px;
    line-height: 1.2;
  }

  .logo-bar .mdi {
    font-size: 2.5rem;
  }

  .search input {
    width: 100%;
    height: 40px;
  }
}
</style>
