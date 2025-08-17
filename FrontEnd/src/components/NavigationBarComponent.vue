<script setup>
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const themeManager = useThemeManagerStore()
onMounted(themeManager.init)

const showHeader = ref(true)
let lastScroll = 0
let headerHeight = 0

function handleScroll() {
  const currentScroll = window.scrollY
  if (currentScroll > headerHeight) {
    showHeader.value = currentScroll < lastScroll
  }
  lastScroll = currentScroll
}

onMounted(() => {
  const forma = window.innerWidth < 768 ? '.celular' : '.notebook'
  const headerEl = document.querySelector(forma)
  if (headerEl) headerHeight = headerEl.offsetHeight
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Estado do menu no celular
const menuAberto = ref(false)
function abrirMenu() {
  menuAberto.value = true
}
function fecharMenu() {
  menuAberto.value = false
}
</script>

<template>
  <div class="notebook" :class="showHeader ? 'animate-slideDown' : 'animate-slideUp'">
    <div class="top-bar" :style="{ backgroundColor: themeManager.detalhe }">
      <p>Transporte escolar para o IFC de forma segura e fácil.</p>
      <span :class="themeManager.icone" @click="themeManager.toggleTheme" aria-label="Alternar tema"></span>
    </div>
    <header :style="{ backgroundColor: themeManager.fundo }">
      <div class="container"
        :style="{ backgroundColor: themeManager.fundo, borderBottom: '2px solid ' + themeManager.detalhe }">
        <div class="logo">
          <img :src="themeManager.logo" alt="Logotipo ROUTER" />
          <p :style="{ color: themeManager.text, borderLeft: '2px solid ' + themeManager.text }">
            Sua rota<br /><span>mais segura</span>
          </p>
        </div>

        <div class="search">
          <input type="text" placeholder="Pesquisar..." :style="{
            backgroundColor: themeManager.fundo,
            color: themeManager.text,
            border: '2px solid ' + themeManager.detalhe
          }" />
          <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
        </div>

        <nav aria-label="Menu principal">
          <ul>
            <li>
              <RouterLink to="/" :style="{ color: themeManager.text }">Início</RouterLink>
            </li>
            <li>
              <RouterLink to="/SobreNos" :style="{ color: themeManager.text }">Sobre</RouterLink>
            </li>
            <li>
              <RouterLink to="/equipe" :style="{ color: themeManager.text }">Equipe</RouterLink>
            </li>
            <li>
              <RouterLink to="/Empresa" :style="{ color: themeManager.text }">Empresas</RouterLink>
            </li>
            <li>
              <RouterLink to="/login">
                <span class="mdi mdi-account" :style="{ color: themeManager.text }"></span>
              </RouterLink>
            </li>
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
          <div class="logo">
            <img :src="themeManager.logo" alt="Logotipo ROUTER" />
            <p :style="{ color: themeManager.text, borderLeft: '2px solid ' + themeManager.text }">
              Sua rota<br /><span>mais segura</span>
            </p>
          </div>
          <div>
            <span class="mdi mdi-view-headline" @click="abrirMenu" :style="{ color: themeManager.text }"></span>
          </div>
        </div>

        <div class="search">
          <input type="text" placeholder="Pesquisar..." :style="{
            backgroundColor: themeManager.fundo,
            color: themeManager.text,
            border: '2px solid ' + themeManager.detalhe
          }" />
          <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
        </div>
      </div>
      <nav class="menu-mobile" :class="{ 'menu-aberto': menuAberto }" :style="{ backgroundColor: themeManager.fundo }">
        <div class="menu-top">
          <RouterLink to="/login" @click="fecharMenu">
            <span class="mdi mdi-account" :style="{ color: themeManager.text }"></span>
          </RouterLink>
          <span class="mdi mdi-close-outline" @click="fecharMenu" :style="{color: themeManager.text}"></span>
        </div>
        <ul>
          <li>
            <RouterLink to="/" :style="{ color: themeManager.text }" @click="fecharMenu">Início</RouterLink>
          </li>
          <li>
            <RouterLink to="/SobreNos" :style="{ color: themeManager.text }" @click="fecharMenu">Sobre</RouterLink>
          </li>
          <li>
            <RouterLink to="/equipe" :style="{ color: themeManager.text }" @click="fecharMenu">Equipe</RouterLink>
          </li>
          <li>
            <RouterLink to="/Empresa" :style="{ color: themeManager.text }" @click="fecharMenu">Empresas</RouterLink>
          </li>
        </ul>
        <span :class="themeManager.icone" :style="{ color: themeManager.text }"
          @click="themeManager.toggleTheme"></span>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.notebook,
.celular {
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  z-index: 999;
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

.logo {
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

nav ul {
  display: flex;
  gap: 18px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  flex-wrap: wrap;
}

nav ul li a {
  font-size: 1.1em;
  text-decoration: none;
  padding: 5px 8px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: 500;
}

nav ul li a:hover {
  text-decoration: underline;
  font-weight: bold;
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
    justify-content: space-between;
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
