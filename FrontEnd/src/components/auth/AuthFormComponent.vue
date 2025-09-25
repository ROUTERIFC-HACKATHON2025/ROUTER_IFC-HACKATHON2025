<script setup>
import axios from 'axios'
import { ref, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeAuthStore } from '@/stores/theme/themeAuth'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const themeAuth = useThemeAuthStore()

const usuario = ref({
  username: '',
  password: ''
})

const erro = ref('')
const showPassword = ref(false)
const isRegister = ref(false) // controla qual painel mostrar

onMounted(async () => {
  themeManager.init()
  authState.restaurarState()

  await nextTick()
  const animateElements = () => {
    const elements = document.querySelectorAll('.animate-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        } else {
          entry.target.classList.remove('in-view')
        }
      })
    }, { threshold: 0.1 })

    elements.forEach(el => observer.observe(el))
  }

  animateElements()
  window.addEventListener('scroll', () => {
    animateElements()
  })
})

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  erro.value = ''
  try {
    const tokenRes = await axios.post('http://localhost:8000/api/token/', { ...usuario.value })
    const access = tokenRes?.data?.access
    if (!access) {
      erro.value = 'Falha na autenticação.'
      return
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    localStorage.setItem('jwt_access', access)

    const meRes = await axios.get('http://localhost:8000/api/usuarios/me/', {
      headers: { Authorization: `Bearer ${access}` }
    })

    if (meRes?.data?.is_passageiro) {
      authState.mudarState('passageiro')
      return
    }
    if (meRes?.data?.is_motorista) {
      authState.mudarState('motorista')
      return
    }
    if (meRes?.data?.is_admin) {
      authState.mudarState('admin')
      return
    }
    erro.value = 'Tipo de usuário desconhecido.'
  } catch (err) {
    console.error('Erro no login:', err)
    erro.value = 'E-mail/usuário ou senha incorretos.'
  }
}
</script>

<template>
  <section class="auth-wrapper" :class="{ 'show-register': isRegister }">
    <!-- Painel Login -->
    <div class="login-container">
      <div class="left-panel animate-on-scroll fade-in-left" :style="{ backgroundColor: themeManager.detalhe }">
        <h2>Ainda não tem sua<br> conta no RouterIFC?</h2>
        <p>Crie sua conta já e aproveite tudo que<br> o RouterIFC pode oferecer para você</p>
        <button :style="{ color: themeManager.detalhe }" @click="isRegister = true">
          Cadastrar-se
        </button>
      </div>

      <div class="right-panel animate-on-scroll fade-in-right" :style="{ backgroundColor: themeManager.fundo }">
        <div class="form-box">
          <h1 class="title" :style="{ color: themeManager.detalhe }">Bem-vindo de volta</h1>
          <p class="subtitle" :style="{ color: themeManager.text }">Acesse sua conta para continuar</p>

          <form @submit.prevent="handleLogin" class="form" novalidate>
            <p v-if="erro" class="erro-msg">{{ erro }}</p>

            <div class="input-group">
              <span class="mdi mdi-email icon" :style="{ color: themeManager.text }"></span>
              <input v-model="usuario.username" type="text" placeholder="E-mail ou usuário" class="input"
                :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }"
                @keydown.enter.prevent="handleLogin" />
            </div>

            <div class="input-group">
              <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
              <input v-model="usuario.password" :type="showPassword ? 'text' : 'password'" placeholder="Senha"
                autocomplete="current-password" class="input"
                :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }"
                @keydown.enter.prevent="handleLogin" />
              <span class="mdi toggle-eye" :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click="toggleShowPassword"
                :style="{ color: themeManager.text }"></span>
            </div>

            <button type="button" class="recover-link" @click="authState.mudarState('esqueceuSenha')"
              :style="{ color: themeManager.text }">
              Esqueceu a senha?
            </button>

            <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
              Entrar
            </button>
            <button type="button" class="register-link" @click="authState.mudarState('autentificacao')"
              :style="{ color: themeManager.text }">Cadastre-se</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Painel Cadastro -->
    <div class="register-container">
      <div class="login-box-left animate-on-scroll fade-in-left">
        <h1 :style="{ color: themeManager.detalhe }">
          SE CADASTRE<br> ROUTER IFC!
        </h1>

        <p class="subtext" :style="{ color: themeManager.text }">Como você deseja se cadastrar?</p>

        <div class="button-group">
          <RouterLink to="/Register">
            <button class="login-button" :style="{ backgroundColor: themeManager.detalhe }"
              @click="authState.mudarStateAuth('Passageiro')">
              <span class="mdi mdi-seat-passenger"></span>
              <p>Conta Passageiro</p>
            </button>
          </RouterLink>

          <RouterLink to="/Register">
            <button class="login-button" :style="{ backgroundColor: themeManager.detalhe }"
              @click="authState.mudarStateAuth('Motorista')">
              <span class="mdi mdi-bus-school "></span>
              <p>Conta Motorista</p>
            </button>
          </RouterLink>
        </div>
      </div>
      <div class="login-box-right animate-on-scroll fade-in-right" :style="{ backgroundColor: themeManager.detalhe }">
        <h2>Já tem a sua conta<br> no RouterIFC?</h2>
        <p>Entre em sua conta já e aproveite<br> tudo que o RouterIFC pode<br> oferecer para você</p>
        <p class="footer" :style="{ color: themeManager.text }">
          <button class="link" @click="isRegister = false" :style="{ color: themeManager.detalhe }">
            Login
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== WRAPPER PRINCIPAL ===== */
.auth-wrapper {
  display: flex;
  width: 200%;
  height: 80vh;
  transition: transform 0.8s ease-in-out;
  transform: translateX(0);
  overflow: hidden;
}

.auth-wrapper.show-register {
  transform: translateX(-50%);
}

/* ===== LOGIN & REGISTER CONTAINERS ===== */
.login-container,
.register-container {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ===== PAINEL LOGIN ===== */
.left-panel {
  flex: 1;
  display: flex;
  height: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  text-align: left;
  padding: 20px;
}

.left-panel h2 {
  font-size: 2.5rem;
  margin-left: 100px;
  margin-bottom: 0.5rem;
  text-align: left;
}

.left-panel p {
  margin-left: 100px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.left-panel button {
  margin-left: 100px;
  padding: 10px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.left-panel button:hover {
  transform: scale(1.05);
}

/* ===== LADO DIREITO DO LOGIN ===== */
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
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ===== INPUTS ===== */
.input-group {
  position: relative;
}

.input {
  width: 100%;
  padding: 14px 44px;
  border-radius: 15px;
  font-size: 1rem;
  border: 1px solid;
  margin-top: 1rem;
}

.input:focus {
  outline: none;
  border-color: #0077ff;
  box-shadow: 0 0 6px rgba(0, 119, 255, 0.3);
}

.icon {
  position: absolute;
  left: 14px;
  top: 60%;
  transform: translateY(-50%);
  font-size: 1.3rem;
}

.toggle-eye {
  position: absolute;
  right: 14px;
  top: 60%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  cursor: pointer;
}

/* ===== BOTÕES ===== */
.submit-btn {
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.3s ease;
}

.submit-btn:hover {
  transform: scale(1.05);
}

.recover-link,
.register-link {
  background: none;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  margin: 0 0 0 auto;
  display: block;
}

.register-link {
  display: none;
  margin: 0;
  text-decoration: underline;
}

.erro-msg {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

/* ===== PAINEL CADASTRO ===== */
.register-container .login-box-right,
.register-container .login-box-left {
  width: 100%;
  height: 600px;
  text-align: center;
  align-items: center;
  margin: auto;
  padding: 20px;
}

.login-box-right {
  flex: 1;
  display: flex;
  height: 700px;
  min-width: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: white;
  text-align: left;
  padding: 40px;
}

.login-box-right h2 {
  font-size: 2.5rem;
  margin-left: 150px;
  margin-bottom: 0.5rem;
  text-align: right;
}

.login-box-right p {
  margin-left: 270px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: right;
}

.login-box-right button {
  margin-left: 100px;
  padding: 10px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.login-box-right button:hover {
  transform: scale(1.05);
}

.login-box-left {
  flex: 1;
  display: flex;
  height: 700px;
  min-width: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: white;
  text-align: left;
  padding: 40px;
}

h1 {
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
}

.subtext {
  margin-bottom: 1.5rem;
}

.login-box-left .button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.login-box-left .button-group .login-button {
  color: white;
  border: none;
  width: 240px;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  display: block;
  gap: 8px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.login-box-left .login-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.login-box-left .login-button p {
  font-size: 1.1rem;
  margin: 0;
}

.login-box-left .login-button .mdi {
  font-size: 4rem;
}

/* ===== ANIMAÇÕES ===== */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(.2, .65, .25, 1);
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-left {
  transform: translateX(-50px);
}

.fade-in-left.in-view {
  transform: translateX(0);
}

.fade-in-right {
  transform: translateX(50px);
}

.fade-in-right.in-view {
  transform: translateX(0);
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
  .auth-wrapper {
    width: 100%;
    flex-direction: column;
    transform: none !important;
  }

  .login-container,
  .register-container {
    width: 100%;
    padding: 40px 20px 20px 20px;
  }

  .left-panel {
    display: none;
  }

  .form-box,
  .register-container .login-box {
    width: 100%;
  }

  .login-button {
    font-size: 0.9rem;
  }

  .register-link {
    display: block;
    text-align: center;
  }
}
</style>
