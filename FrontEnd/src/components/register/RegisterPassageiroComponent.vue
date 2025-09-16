<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { usePassageiroStore } from '@/stores/passageiros'

const router = useRouter()
const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const passageirosStore = usePassageiroStore()

// Modelo padrão de passageiro
const defaultPassageiro = {
  idPassageiros: 0,
  nome: '',
  telefone: '',
  email: '',
  cpf: '',
  dataNascimento: '',
  nomeResponsavel: '',
  cpfResponsavel: '',
  telefoneResponsavel: '',
  senha: '',
  confirmarSenha: '',
  informacoesAdicionais: ''
}

// Modelo padrão de endereço
const defaultEndereco = {
  cep: '',
  rua: '',
  numero: '',
  cidade: '',
  bairro: ''
}

const passageiro = reactive({ ...defaultPassageiro })
const endereco = reactive({ ...defaultEndereco }) // ✅ agora existe
const isEditing = ref(false)

// Função para resetar formulário
function resetForm() {
  Object.assign(passageiro, { ...defaultPassageiro })
  Object.assign(endereco, { ...defaultEndereco })
}

// Função para cadastrar/atualizar passageiro
async function cadastrar() {
  if (!passageiro.nome || !passageiro.email || !passageiro.cpf) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }

  if (passageiro.senha !== passageiro.confirmarSenha) {
    alert('As senhas não coincidem!')
    return
  }

  const { confirmarSenha, informacoesAdicionais, ...payload } = passageiro

  if (isEditing.value) {
    await passageirosStore.updatePassageiro(payload)
  } else {
    await passageirosStore.addPassageiro(payload)
    // Após cadastro, redireciona para authForm
    router.push('/login')
  }

  resetForm()
}

// Animações + inicialização
onMounted(() => {
  themeManager.init()
  authState.restaurarStateEmpresa()

  const elements = document.querySelectorAll('.animate-on-scroll')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, { threshold: 0.1 })

  elements.forEach(el => observer.observe(el))
})
</script>



<template>
  <section class="form-container animate-on-scroll" :style="{ color: themeManager.text }">
    <h1>CADASTRO <span :style="{ color: themeManager.detalheAlternativo }">PASSAGEIRO</span></h1>
    <form @submit.prevent="cadastrar" :style="{ borderColor: themeManager.detalheAlternativo }">

      <div class="space animate-on-scroll" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2><span class="mdi mdi-account" :style="{ color: themeManager.detalheAlternativo }"></span> Informações Pessoais
        </h2>
        <div class="grid">
          <div>
            <p>Nome Completo: *</p>
            <input v-model="passageiro.nome" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>E-mail: *</p>
            <input v-model="passageiro.email" type="email" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>CPF do Aluno: *</p>
            <input v-model="passageiro.cpf" placeholder="000.000.000-00" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Telefone: *</p>
            <input v-model="passageiro.telefone" class="input-field-mid" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Data de Nascimento: *</p>
            <input v-model="passageiro.dataNascimento" type="date" class="input-field-mid" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Senha: *</p>
            <input v-model="passageiro.senha" type="password" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Confirme sua Senha: *</p>
            <input v-model="passageiro.confirmarSenha" type="password" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Informações adicionais:</p>
            <input type="text" class="input-field-add" v-model="passageiro.informacoesAdicionais"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
        </div>
      </div>
      <div class="space animate-on-scroll" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2 class="responsaveis"><span class="mdi mdi-human-male-male-child"
            :style="{ color: themeManager.detalheAlternativo }"></span> Informações dos Responsáveis</h2>
        <div class="grid">
          <div>
            <p>Nome Completo do Responsável: *</p>
            <input v-model="passageiro.nomeResponsavel"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
          <!-- <div>
            <p>Parentesco: *</p>
            <input v-model="passageiro.parentesco" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          </div> -->
          <div>
            <p>CPF do Responsável: *</p>
            <input v-model="passageiro.cpfResponsavel"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
          <div>
            <p>Telefone: *</p>
            <input v-model="passageiro.telefoneResponsavel"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
        </div>
      </div>
      <div class="buttons">
      <button type="submit" class="submit" :style="{ backgroundColor: themeManager.detalhe }">Cadastrar-se</button>
      <button type="button" @click="resetForm" :style="{ backgroundColor: themeManager.detalheAlternativo }">Cancelar</button>
      </div>
    </form>
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

.form-container {
  margin: 0 300px;
  padding: 0 0 200px 0;
  border-radius: 8px;
  font-family: sans-serif;
  align-items: center;
}

form {
  border: 2px solid;
  padding: 40px 100px 160px 100px;
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  padding: 100px 0 60px 0;
}

.space {
  margin-bottom: 15px;
  padding-bottom: 40px;
  border-bottom: 2px solid;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
}

h2 span {
  font-size: 1.7em;
  align-items: center;
}

.sub {
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 20px;
}

.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.grid div {
  margin-bottom: 10px;
}

.grid div p {
  font-size: 0.8rem;
}

input {
  padding: 0.7rem;
  border: 1px solid;
  border-radius: 10px;
  min-width: 350px;
}

.input-field-mid {
  min-width: 170px;
}

.input-field-add {
  min-width: 720px;
  height: 100px;
}

.buttons{
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 20px;
}

button.submit {
  margin-top: 20px;
  width: 30%;
  padding: 14px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;

}

button {
  margin-top: 20px;
  width: 30%;
  padding: 14px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
  width: 30%;
}

button:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .form-container {
    margin: 0 10px;
    padding: 20px 0 100px 0;
  }

  form {
    padding: 40px 20px 100px 20px;
  }

  .input-field-add {
    min-width: 350px;
    height: 100px;
  }
}
</style>
