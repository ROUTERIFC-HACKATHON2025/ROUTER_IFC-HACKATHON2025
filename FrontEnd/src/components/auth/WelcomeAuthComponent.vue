<script setup>
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { RouterLink } from 'vue-router'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

onMounted(() => {
  themeManager.init()
  authState.restaurarState()
})

</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo }">
    <img class="login-image fade-in-left" :src="themeManager.menininha" alt="Ilustração de login" />

    <div class="login-box fade-in-right">
      <h1 :style="{ color: themeManager.text }">
        FAÇA LOGIN EM SUA CONTA <br />
        NO <span class="highlight">ROUTER IFC!</span>
      </h1>

      <p class="subtext" :style="{ color: themeManager.text }">Como você deseja logar?</p>

      <div class="button-group">
        <button
          class="login-button glow"
          :style="{ backgroundColor: themeManager.detalhe }"
          @click="authState.mudarState('autentificacao')"
        >
          <span class="mdi mdi-seat-passenger icon"></span>
          <p>Conta Passageiro</p>
        </button>

        <button
          class="login-button glow"
          :style="{ backgroundColor: themeManager.detalhe }"
          @click="authState.mudarState('autentificacao')"
        >
          <span class="mdi mdi-bus-school icon"></span>
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
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.1;
  transition: color 0.3s ease;
}

.highlight {
  color: #59A3E2;
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

.register-text {
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  color: #59A3E2;
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.register-link:hover {
  color: #1863A2;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
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
