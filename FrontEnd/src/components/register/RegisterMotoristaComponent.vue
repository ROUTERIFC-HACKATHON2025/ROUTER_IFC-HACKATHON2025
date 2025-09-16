<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useMotoristaStore } from '@/stores/motorista'
import { useAuthStateStore } from '@/stores/authState'

const router = useRouter()
const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()


const motoristaStore = useMotoristaStore();

const defaultMotorista = { idMotorista: 0, 
nome: '', 
email: '', 
telefone: '', 
cpf: '', 
codigoCnh: '', 
senha: '',
confirmarSenha: '',};

const motorista = reactive({ ...defaultMotorista });
const isEditing = ref(false);

const empresas = ['SulTurismo', 'IndyTour']
const aberto = ref(false)

function toggleSelect() {
  aberto.value = !aberto.value
}

function selecionarEmpresa(nome) {
  motorista.value.empresa = nome
  authState.mudarStateEmpresa(nome)
  aberto.value = false
}

onMounted(() => {
  themeManager.init()
  authState.restaurarStateEmpresa()

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
})

function resetForm() {
    Object.assign(motorista, { ...defaultMotorista });
}

async function cadastrar() {
  if (isEditing.value) {
        await motoristaStore.updateMotorista({ ...motorista });
    } else {
    if (motorista.senha !== motorista.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    delete motorista.confirmarSenha;
      await motoristaStore.addMotorista({ ...motorista });
      router.push('/login')
    }
    resetForm();
}

</script>

<template>
  <section class="form-container animate-on-scroll" :style="{ color: themeManager.text }">
    <h1>CADASTRO <span :style="{ color: themeManager.detalheAlternativo }">MOTORISTA</span></h1>

    <form @submit.prevent="cadastrar" :style="{ borderColor: themeManager.detalheAlternativo }">
      <div class="space animate-on-scroll" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2>
          <span class="mdi mdi-account" :style="{ color: themeManager.detalheAlternativo }"></span>
          Informações Pessoais
        </h2>

        <div class="grid">
          <div>
            <p>Nome Completo: *</p>
            <input v-model="motorista.nome" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>E-mail: *</p>
            <input v-model="motorista.email" type="email" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>CPF: *</p>
            <input v-model="motorista.cpf" placeholder="000.000.000-00" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Telefone: *</p>
            <input v-model="motorista.telefone" class="input-field-mid" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Crie uma senha: *</p>
            <input v-model="motorista.senha" type="password" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Confirme sua Senha: *</p>
            <input v-model="motorista.confirmarSenha" type="password" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Selecione a empresa: *</p>
            <div
              class="select-custom"
              :style="{ borderColor: themeManager.detalhe, backgroundColor: themeManager.detalhe, color: '#fff' }"
              @click="toggleSelect"
            >
              {{ motorista.empresa || 'Selecione a empresa' }}
              <span class="seta"><span :class="aberto ? 'mdi mdi-arrow-up' : 'mdi mdi-arrow-down'"></span></span>
            </div>

            <div
              v-show="aberto"
              class="opcoes"
              :style="{ borderColor: themeManager.detalhe, backgroundColor: themeManager.fundo }"
            >
              <div
                v-for="empresa in empresas"
                :key="empresa"
                class="opcao"
                @click.stop="selecionarEmpresa(empresa)"
                :class="{ selecionada: motorista.empresa === empresa }"
                :style="{
                  backgroundColor: motorista.empresa === empresa ? themeManager.detalhe : themeManager.fundo,
                  color: motorista.empresa === empresa ? '#fff' : themeManager.text
                }"
              >
                {{ empresa }}
              </div>
            </div>
          </div>

          <div>
            <p>CNH(nº registro): *</p>
            <input v-model="motorista.codigoCnh" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
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
  padding: 0px 0 200px 0;
  border-radius: 8px;
  font-family: sans-serif;
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
h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}
.space {
  margin-bottom: 15px;
  padding-bottom: 40px;
  border-bottom: 2px solid;
}

.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.grid div {
  margin-bottom: 10px;
}

.grid div p{
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

.select-custom {
  margin-bottom: 0;
  padding: 0.7rem;
  border: 2px solid;
  border-radius: 10px;
  min-width: 350px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.seta {
  font-size: 0.8rem;
}

.opcoes {
  border: 2px solid;
  border-radius: 12px;
  overflow: hidden;
}

.opcao {
  padding: 0.7rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.selecionada {
  font-weight: bold;
}

.btn-upload {
  cursor: pointer;
  padding: 0.7rem;
  border-radius: 10px;
  font-weight: 600;
}

.file-name {
  font-size: 0.8rem;
  font-style: italic;
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

  .input-field-mid {
    min-width: 150px;
  }

  .file-upload {
    flex-direction: column;
    align-items: flex-start;
  }

  .file-name {
    margin-top: 5px;
  }

  .space{
    border: none;
  }
}
</style>
