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
  <section class="notebook" :style="{ backgroundColor: themeManager.fundo, background: 'url(' + themeAuth.linha + ') no-repeat left center',
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
  <section class="celular" :style="{ backgroundColor: themeManager.fundo }">
    <div class="login-box fade-in-right">
      <h1 :style="{ color: themeManager.text }">
        CADASTRE-SE NO <br /><span class="highlight" :style="{ color: themeManager.detalheAlternativo }">ROUTER IFC!</span>
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

.notebook, .celular {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 120px;
  min-width: 80vh;
}

.celular{
  display: none;
}

.login-image {
  width: 470px;
  max-width: 100%;
}

.login-box {
  display: flex;
  flex-direction: column;
  text-align: right;
  max-width: 500px;
}

h1 {
  margin-bottom: 1rem;
  font-size: 3.5rem;
}

.subtext {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: right;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.login-button {
  color: white;
  border: none;
  width: 240px;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
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

@media screen and (max-width: 768px) {
  .notebook {
    display: none;
  }
  .celular {
  display: block;
  align-items: center;
  margin: 120px 10px 0 10px;
  min-width: 30vh;
  height: 57vh;
}

.login-box {
  display: flex;
  flex-direction: column;
  text-align: right;
  max-width: 400px;
}

h1 {
  margin-bottom: 10px;
  font-size: 2.5rem;
  text-align: center;
}

.subtext {
  margin-bottom: 1.5rem;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 10px;
}

.login-button {
  color: white;
  border: none;
  width: 180px;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
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
}
</style>
