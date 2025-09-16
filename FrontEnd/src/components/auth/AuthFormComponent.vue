<script setup>
import axios from 'axios'
import { ref, onMounted, nextTick } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()

const usuario = ref({
  username: '',
  password: ''
})

const erro = ref('')
const showPassword = ref(false)

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
<<<<<<< HEAD
  const { data } = await axios.post('http://localhost:8000/api/token/', { ...usuario.value })
    .catch(err => {
      console.error('Erro ao obter token:', err)
      erro.value = 'E-mail ou senha incorretos.'
    })
  if (!data?.access) return
  localStorage.setItem('accessToken', data.access)
  const response = await axios.get('http://localhost:8000/api/usuarios/me/', {
    headers: {
      Authorization: `Bearer ${data.access}`
    }
  }).catch(err => {
    console.error('Erro ao obter informações do usuário:', err)
    erro.value = 'Erro ao obter informações do usuário.'
  })
  if (response.data) {
    userProfile.setUsuarioAtual(response.data)
  }
  if (response.data.is_passageiro) {
    authState.mudarState('passageiro')
  }
  else if (response.data.is_motorista) {
    authState.mudarState('motorista')
  }
  else if (response.data.is_admin) {
    authState.mudarState('admin')
  }
  else {
=======
  erro.value = ''
  try {
    const tokenRes = await axios.post('http://localhost:8000/api/token/', { ...usuario.value })
    const access = tokenRes?.data?.access
    if (!access) {
      erro.value = 'Falha na autenticação.'
      return
    }
    // adiciona o token para as próximas requisições
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
>>>>>>> 481a1e7febaa7b8b6b9bbe092253496c1eabc8a8
    erro.value = 'Tipo de usuário desconhecido.'
  } catch (err) {
    console.error('Erro no login:', err)
    erro.value = 'E-mail/usuário ou senha incorretos.'
  }
}
</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo }">
    <div class="left-panel animate-on-scroll fade-in-left" :style="{ backgroundColor: themeManager.detalhe }">
      <img src="/src-auth/auth-form-illustration.png" alt="Login Illustration" />
    </div>

    <div class="right-panel animate-on-scroll fade-in-right" :style="{ backgroundColor: themeManager.fundo }">
      <div class="form-box">
        <h1 class="title" :style="{ color: themeManager.text }">Bem-vindo de volta</h1>
        <p class="subtitle" :style="{ color: themeManager.text }">Acesse sua conta para continuar</p>

        <form @submit.prevent="handleLogin" class="form" novalidate>
          <p v-if="erro" class="erro-msg">{{ erro }}</p>

          <div class="input-group">
            <span class="mdi mdi-email icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="usuario.username"
              type="text"
              placeholder="E-mail"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }"
              @keydown.enter.prevent="handleLogin" />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="usuario.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Senha"
              autocomplete="current-password"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }"
              @keydown.enter.prevent="handleLogin" />
            <span class="mdi toggle-eye" :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click="toggleShowPassword"
              :style="{ color: themeManager.text }"></span>
          </div>

          <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
            Entrar
          </button>
        </form>

        <p class="register-text" :style="{ color: themeManager.text }">
          Ainda não tem uma conta?
          <button class="register-link" @click="authState.mudarState('autentificacao')"
            :style="{ color: themeManager.detalhe }">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  transform: translateY(50px);
}

.fade-in-left.in-view {
  transform: translateY(0);
}

.fade-in-right {
  transform: translateY(50px);
}

.fade-in-right.in-view {
  transform: translateY(0);
}

.login-container {
  display: flex;
  height: 80vh;
}

.left-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.left-panel img {
  max-width: 70%;
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
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  margin-top: 1rem;
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

.submit-btn {
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: scale(1.05);
}

.footer {
  margin-top: 1.5rem;
}

.register-text {
  font-size: 0.8rem;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  background: none;
  font-size: 0.8rem;
  text-decoration: underline;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  border: none;
  cursor: pointer;
}

.recover-link {
  background: none;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  margin: 0 0 0 70%;
}

.social-login {
  margin-top: 1rem;
}

.social-login p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.social-login ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-login li button {
  background: none;
  border: 2px solid;
  padding: 2px 4px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.social-login li button:hover {
  transform: scale(1.1);
}

.erro-msg {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .login-container {
    margin-top: 20px;
    flex-direction: column;
    height: 70vh;
  }

  .left-panel {
    display: none;
  }

  .right-panel {
    width: 100%;
    padding: 20px;
  }

  .form-box {
    width: 100%;
  }
}
</style>
