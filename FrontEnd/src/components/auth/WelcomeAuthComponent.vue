<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useThemeAuthStore } from '@/stores/theme/themeAuth'
import { RouterLink } from 'vue-router'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const themeAuth = useThemeAuthStore()

onMounted(() => {
  themeManager.init()
  authState.restaurarState()
})

</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo, background: 'url(' + themeAuth.linha + ') no-repeat left center',
        backgroundSize: 'auto 101%', }">
    <img class="login-image fade-in-left" :src="themeAuth.menininha" alt="Ilustração de login" />

    <div class="login-box fade-in-right">
      <h1 :style="{ color: themeManager.text }">
        SE CADASTRE 
        NO <br /><span class="highlight" :style="{ color: themeManager.detalheAlternativo }">ROUTER IFC!</span>
      </h1>

      <p class="subtext" :style="{ color: themeManager.text }">Como você deseja se cadastrar?</p>

      <div class="button-group">
        <RouterLink to="/Register">
          <button
          class="login-button glow"
          :style="{ backgroundColor: themeManager.detalhe }"
          @click="authState.mudarStateAuth('Passageiro')"
        >
          <span class="mdi mdi-seat-passenger icon"></span>
          <p>Conta Passageiro</p>
        </button>
        </RouterLink>
        
        <RouterLink to="/Register">
        <button
          class="login-button glow"
          :style="{ backgroundColor: themeManager.detalhe }"
          @click="authState.mudarStateAuth('Motorista')"
        >
          <span class="mdi mdi-bus-school icon"></span>
          <p>Conta Motorista</p>
        </button>
        </RouterLink>
      </div>
       <p class="footer" :style="{ color: themeManager.text }">
          <button class="link" @click="authState.mudarState('inicio')" :style="{ color: themeManager.detalhe }">
            &larr; Voltar
          </button>
        </p>
    </div>
  </section>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 80px 0;
  margin: 0px 120px;
  min-width: 100vh;
  flex-wrap: wrap;
  animation: fadeIn 1s ease-in-out;
}

.login-image {
  width: 500px;
  max-width: 100%;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.login-box {
  display: flex;
  flex-direction: column;
  text-align: right;
  max-width: 500px;
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease-out;
}

h1 {
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.1;
  transition: color 0.3s ease;
}

.highlight {
  font-weight: bold;
  transition: color 0.3s ease;
}

.subtext {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.button-group {
  display: flex;
  justify-content: right;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.login-button {
  color: white;
  border: none;
  width: 240px;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 3rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.login-button:hover .icon {
  transform: scale(1.2);
}

.login-button p {
  font-size: 1.1rem;
  margin: 0;
}

.link {
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
</style>
