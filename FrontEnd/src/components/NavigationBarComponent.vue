<script setup>
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { RouterLink } from 'vue-router'


const themeManager = useThemeManagerStore()
onMounted(themeManager.init)

import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const showHeader = ref(true)
let lastScroll = 0
let headerHeight = 0

function handleScroll() {
  const currentScroll = window.scrollY

  if (currentScroll > headerHeight) {
    if (currentScroll < lastScroll) {
      showHeader.value = true
    } else {
      showHeader.value = false 
    }
  }

  lastScroll = currentScroll
}

onMounted(() => {
  const headerEl = document.querySelector('header')
  if (headerEl) {
    headerHeight = headerEl.offsetHeight
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="header"
    :class="showHeader ? 'animate-slideDown' : 'animate-slideUp'">
    <div class="top-bar" :style="{ backgroundColor: themeManager.detalhe }">
    <p>Transporte escolar para o IFC de forma segura e fácil.</p>
    <span :class="themeManager.icone" @click="themeManager.toggleTheme" aria-label="Alternar tema"></span>
  </div>
  <header :style="{ backgroundColor: themeManager.fundo }">
    <div
      class="container"
      :style="{
        backgroundColor: themeManager.fundo,
        borderBottom: '2px solid ' + themeManager.detalhe
      }"
    >
      <div class="logo">
        <img :src="themeManager.logo" alt="Logotipo ROUTER" />
        <p :style="{ color: themeManager.text, borderLeft: '2px solid ' + themeManager.text }">
          Sua rota<br /><span>mais segura</span>
        </p>
      </div>

      <div class="search">
        <input
          type="text"
          placeholder="Pesquisar..."
          :style="{
            backgroundColor: themeManager.fundo,
            color: themeManager.text,
            border: '2px solid ' + themeManager.detalhe
          }"
        />
        <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
      </div>

      <nav aria-label="Menu principal">
        <ul>
          <li><RouterLink to="/" :style="{ color: themeManager.text }">Início</RouterLink></li>
          <li><RouterLink to="/SobreNos" :style="{ color: themeManager.text }">Sobre</RouterLink></li>
          <li><RouterLink to="/equipe" :style="{ color: themeManager.text }">Equipe</RouterLink></li>
          <li><RouterLink to="/Empresa" :style="{ color: themeManager.text }">Empresas</RouterLink></li>
          <li>
            <RouterLink to="/login">
              <span class="mdi mdi-account" :style="{ color: themeManager.text }" aria-label="Login"></span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  </div>
</template>

<style scoped>
.header {
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

.top-bar p{
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

.search input:focus + .mdi {
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

</style>
