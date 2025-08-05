<script setup>
import { ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()

const motorista = ref({
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  nascimento: '',
  senha: '',
  confirmarSenha: '',
  empresa: '',
  cnhArquivo: null
})

function cadastrar() {
  console.log('Dados enviados:', motorista.value)
}
</script>

<template>
  <section class="form-container" :style="{ color: themeManager.text }">
    <h1>CADASTRO <span :style="{ color: themeManager.detalheAlternativo }">MOTORISTA</span></h1>

    <form @submit.prevent="cadastrar" :style="{ borderColor: themeManager.detalheAlternativo }">
      <div class="space" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2>
          <span class="mdi mdi-account" :style="{ color: themeManager.detalheAlternativo }"></span>
          Informações Pessoais
        </h2>

        <div class="grid">
          <input v-model="motorista.nome" placeholder="Nome Completo *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="motorista.email" type="email" placeholder="E-mail *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="motorista.cpf" placeholder="CPF *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="motorista.telefone" placeholder="Telefone *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="motorista.nascimento" type="date" placeholder="Data de nascimento *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="motorista.senha" type="password" placeholder="Crie uma senha *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="motorista.confirmarSenha" type="password" placeholder="Confirme sua senha *" required
             :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          
          <select v-model="motorista.empresa" required  :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}">
            <option disabled value="">Selecione a empresa *</option>
            <option value="SulTurismo">SulTurismo</option>
            <option value="IndyTour">IndyTour</option>
          </select>

          <input  type="file" @change="e => motorista.cnhArquivo = e.target.files[0] "
            required :style="{borderColor: '#fffff000', backgroundColor: themeManager.fundo, color: themeManager.text}"/>
        </div>
      </div>

      <button type="submit" class="submit" :style="{ backgroundColor: themeManager.detalhe }">
        Cadastrar-se
      </button>
    </form>
  </section>
</template>

<style scoped>
.form-container {
  margin: 0 300px;
  padding: 50px 0 200px 0;
  border-radius: 8px;
  font-family: sans-serif;
  align-items: center;
}

form {
  border: 2px solid;
  padding: 20px 100px 160px 100px;
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-weight: bold;
  font-size: 2.4em;
  margin: 40px 0;
}

h1 span {
  font-weight: bold;
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
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

input,
select {
  padding: 0.7rem;
  border: 1px solid;
  border-radius: 15px;
  width: 100%;
  align-items: center;
}

button.submit {
  display: block;
  margin: auto;
  padding: 0.8rem 2rem;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
</style>
