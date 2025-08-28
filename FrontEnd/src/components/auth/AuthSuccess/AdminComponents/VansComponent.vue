<script setup>
import { ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()
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
            placeholder="Pesquisar..." 
            :style="{
              backgroundColor: themeManager.fundo,
              color: themeManager.text,
              border: '2px solid ' + themeManager.detalhe
            }"
          />
          <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
        </div>
      </div>

      <ul :style="{ borderColor: themeManager.detalhe }">
        <li v-for="van in userProfile.vans" :key="van.id" class="card-van" :style="{ borderColor: themeManager.detalhe }" @click="authState.mudarAdminPage('configVans')">
          <span class="mdi mdi-van-passenger icone" :style="{ color: themeManager.detalhe }"></span>
          <h3>{{ van.nome }}</h3>
          <p>{{ van.placa }}</p>
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
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px 50px;
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
  padding: 20px 120px 50px 120px;
}

.card-van {
  cursor: pointer;
  border: 1px solid;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.card-van:hover {
  transform: scale(1.05);
}

.icone {
  font-size: 100px;
  display: block;
  margin-bottom: 2px;
}
</style>
