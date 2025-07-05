<script setup>
import { ref, onMounted, watch, cloneVNode } from 'vue';
import logoClaro from '/public/Logo-ROUTER.png';
import logoEscuro from '/public/Logo-ROUTER-escuro.png';

const fundo = ref('#fff'); 
const text = ref('#383838');
const logo = ref(logoClaro);
const icone = ref('mdi mdi-weather-sunny');

onMounted(() => {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    aplicarModoEscuro();
  }
});

const aplicarModoEscuro = () => {
  fundo.value = '#1a1a1a';
  text.value = '#e4e4e4';
  logo.value = logoEscuro;
  icone.value = 'mdi mdi-weather-night';
};

const aplicarModoClaro = () => {
  fundo.value = '#fff';
  text.value = '#383838';
  logo.value = logoClaro;
  icone.value = 'mdi mdi-weather-sunny';
};

const mudarFundo = () => {
  const modoEscuro = fundo.value === '#fff';
  if (modoEscuro) {
    aplicarModoEscuro();
    localStorage.setItem('tema', 'escuro');
  } else {
    aplicarModoClaro();
    localStorage.setItem('tema', 'claro');
  }
};
</script>

<template>
  <header class="fundo" :style="{ backgroundColor: fundo }">
    <div class="mudar-fundo">
      <p>Transporte escolar para o IFC de forma segura e faćil.</p>
      <span :class="icone" @click="mudarFundo" style="color: '#e4e4e4';"></span>
    </div>
    <div class="container" :style="{ backgroundColor: fundo }">
      <div class="logo">
        <img :src="logo" alt="Logotipo da empresa ROUTER" />
        <p :style="{ color: text }">Sua rota<br><span :style="{ color: text }">mais segura</span></p>
      </div>

      <div class="search">
        <input type="text" placeholder="Pesquisar..." :style="{ backgroundColor: fundo, color: text }" />
        <span class="mdi mdi-magnify" aria-hidden="true"></span>
      </div>

      <nav aria-label="Menu principal">
        <ul>
          <li><router-link to="/" :style="{ color: text }">Início</router-link></li>
          <li><router-link to="/sobre" :style="{ color: text }">Sobre</router-link></li>
          <li><router-link to="/equipe" :style="{ color: text }">Equipe</router-link></li>
          <li><router-link to="/contato" :style="{ color: text }">Contato</router-link></li>
          <li>
            <router-link to="/login">
              <span :style="{ color: text }" class="mdi mdi-account" aria-hidden="true"></span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.fundo {
  background-color: #fff;
}

.mudar-fundo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 80px;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  background-color: #59A3E2;
}
.mudar-fundo p {
  margin: 0;
  font-size: 1em;
  line-height: 1.2;
}
.mudar-fundo span {
  font-size: 1.6em;
  cursor: pointer;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 40px 0 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-bottom: 2px solid #59A3E2;
  margin: 0 120px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}
.logo img {
  width: 120px;
  height: auto;
}
.logo p {
  font-size: 1.2em;
  font-weight: 600;
  margin: 0;
  border-left: 4px solid #59A3E2;
  padding-left: 10px;
  line-height: 1.2;
}
.search {
  position: relative;
  margin: 10px 0;
}
.search input {
  padding: 15px 45px 15px 20px;
  border: 2px solid #59A3E2;
  border-radius: 30px;
  width: 400px;
}
.search input:focus {
  outline: none;
}
.search .mdi {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6em;
  color: #59A3E2;
  pointer-events: none;
}
nav ul {
  display: flex;
  gap: 25px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  flex-wrap: wrap;
}
nav ul li a {
  font-size: 1.1em;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: bold;
}
nav ul li a:hover {
  text-decoration: underline;
}
nav ul li a span {
  font-size: 2.3em;
}
@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  .logo,
  .search,
  nav {
    width: 100%;
    margin-bottom: 10px;
  }
  nav ul {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  .search input {
    width: 100%;
  }
}
</style>
