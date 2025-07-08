<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/themeManager'
import { RouterLink } from 'vue-router'

const themeManager = useThemeManagerStore()

onMounted(themeManager.init)
</script>

<template>
  <div class="top-bar" :style="{ backgroundColor: themeManager.detalhe }">
    <p>Transporte escolar para o IFC de forma segura e fácil.</p>
    <span :class="themeManager.icone" @click="themeManager.toggleTheme" aria-label="Alternar tema"></span>
  </div>

  <header :style="{ backgroundColor: themeManager.fundo }">
    <div class="container" :style="{ backgroundColor: themeManager.fundo, borderBottom: '2px solid ' + themeManager.detalhe }">
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
          :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, border: '2px solid ' + themeManager.detalhe }"
        />
        <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
      </div>

      <nav aria-label="Menu principal">
        <ul>
          <li><RouterLink to="/" :style="{ color: themeManager.text }">Início</RouterLink></li>
          <li><RouterLink to="/dashboard" :style="{ color: themeManager.text }">Dashboard</RouterLink></li>
          <li>
            <RouterLink to="/login">
              <span class="mdi mdi-account" :style="{ color: themeManager.text }" aria-label="Login"></span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 5vw;
  color: #e4e4e4;
  font-weight: 600;
  font-size: 0.85rem;
}

.top-bar span {
  cursor: pointer;
  font-size: 1.2rem;
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
}

nav ul li a:hover {
  text-decoration: underline;
}

nav ul li a span {
  font-size: 2em;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .logo,
  .search,
  nav {
    width: 100%;
    margin-bottom: 8px;
  }

  nav ul {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .search input {
    width: 100%;
  }
}
</style> 