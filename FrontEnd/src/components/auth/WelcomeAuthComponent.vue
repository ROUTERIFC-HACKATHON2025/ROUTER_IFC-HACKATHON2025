<script setup>
import { useThemeManagerStore } from '@/stores/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { RouterLink } from 'vue-router'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo }">
    <img class="login-image" :src="themeManager.menininha" alt="Ilustração de login" />

    <div class="login-box">
      <h1 :style="{ color: themeManager.text }">
        FAÇA LOGIN EM SUA CONTA <br />
        NO <span class="highlight">ROUTER IFC!</span>
      </h1>

      <p class="subtext" :style="{ color: themeManager.text }">Como você deseja logar?</p>

      <div class="button-group">
        <button
          class="login-button"
          :style="{ backgroundColor: themeManager.detalhe }"
          @click="authState.mudarState('autentificacao')"
        >
          <span class="mdi mdi-seat-passenger"></span>
          <p>Conta Passageiro</p>
        </button>

        <button
          class="login-button"
          :style="{ backgroundColor: themeManager.detalhe }"
          @click="authState.mudarState('autentificacao')"
        >
          <span class="mdi mdi-bus-school"></span>
          <p>Conta Motorista</p>
        </button>
      </div>

      <p class="register-text" :style="{ color: themeManager.text }">
        Ainda não tem uma conta?
        <RouterLink class="register-link" to="/cadastro">Cadastre-se</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 200px 80px 200px;
  flex-wrap: wrap;
}

.login-image {
  width: 500px;
  max-width: 100%;
}

.login-box {
  display: flex;
  flex-direction: column;
  text-align: right;
  max-width: 500px;
}

h1 {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.highlight {
  color: #59A3E2;
  font-weight: bold;
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
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background-color 0.3s;
}

.login-button span {
  font-size: 3rem;
}

.login-button p {
  font-size: 1.1rem;
  margin: 0;
}

.login-button:hover {
  background-color: #09243f;
}

.register-text {
  font-size: 1rem;
  text-align: center;
}

.register-link {
  color: #59A3E2;
  font-weight: 500;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
  }

  .login-box {
    text-align: center;
    margin-top: 2rem;
  }

  .button-group {
    justify-content: center;
  }

  .login-button {
    width: 100%;
  }
}
</style> 