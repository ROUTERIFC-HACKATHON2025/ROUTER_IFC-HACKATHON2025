<script setup>
import { ref, onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

const email = ref('')
const senha = ref('')
const erro = ref('')
const showPassword = ref(false)

onMounted(() => {
  themeManager.init()
})

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  const emailVal = email.value.trim().toLowerCase()
  const senhaVal = senha.value.trim()

  if (emailVal === 'adm@gmail.com' && senhaVal === 'adm') {
    erro.value = ''
    authState.mudarState('finalizado')
  } else {
    erro.value = 'E‑mail ou senha incorretos.'
  }
}
</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo }">
    <div class="left-panel" :style="{ backgroundColor: themeManager.detalhe }">
      <img src="/auth-form-illustration.png" alt="Login Illustration" />
    </div>

    <div class="right-panel" :style="{ backgroundColor: themeManager.fundo }">
      <div class="form-box">
        <h1 class="title" :style="{ color: themeManager.text }">Bem‑vindo de volta</h1>
        <p class="subtitle" :style="{ color: themeManager.text }">Acesse sua conta para continuar</p>

        <form @submit.prevent="handleLogin" class="form">
          <p v-if="erro" class="erro-msg">{{ erro }}</p>

          <div class="input-group">
            <span class="mdi mdi-email icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="email"
              type="email"
              placeholder="E‑mail"
              class="input"
              autocomplete="email"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }"
            />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="senha"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Senha"
              autocomplete="current-password"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, BorderColor: themeManager.text }"
            />
            <span
              class="mdi toggle-eye"
              :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click="toggleShowPassword"
              :style="{ color: themeManager.text }"
            ></span>
          </div>

          <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
            Entrar
          </button>
        </form>

        <p class="footer" :style="{ color: themeManager.text }">
          <button class="link" @click="authState.mudarState('inicio')" :style="{ color: themeManager.detalhe }">
            &larr; Voltar
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scaleFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.login-container {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  animation: scaleFadeIn 0.6s ease-out;
}

.left-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.left-panel img {
  max-width: 80%;
}

.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-box {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.input {
  width: 100%;
  padding: 14px 44px;
  border-radius: 12px;
  font-size: 1rem;
  border: 1px solid;
}

.icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
}

.toggle-eye {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
.toggle-eye:hover {
  color: #59a3e2 !important;
}

.submit-btn {
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
}
.submit-btn:hover {
  transform: scale(1.05);
}

.footer {
  margin-top: 1.5rem;
}

.link {
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}

.erro-msg {
  color: red;
  font-size: 0.9rem;
  animation: shake 0.3s ease;
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

@media (max-width: 900px) {
  .login-container {
    flex-direction: column;
  }

  .left-panel {
    display: none;
  }

  .right-panel {
    width: 100%;
    padding: 40px 20px;
  }

  .form-box {
    max-width: 100%;
  }
}
</style>
