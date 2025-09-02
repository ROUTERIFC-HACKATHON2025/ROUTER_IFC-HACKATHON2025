<script setup>
import { reactive, onMounted, computed } from 'vue'
import { usePassageirosStore } from '@/stores/passageiros'

const passageirosStore = usepassageirosStore();

const defaultPassageiro = { id: 0, nome: '', telefone: '' };
const passageiro = reactive({ ...defaultPassageiro });

const isEditing = computed(() => passageiro.id !== 0);

onMounted(async () => {
    await passageiroStore.Passageiros();
})

function resetForm() {
    Object.assign(passageiros, { ...defaultPassageiro });
}

async function submitPassageiro() {
    if (isEditing.value) {
        await passageiroStore.updatePassageiro({ ...passageiro });
    } else {
        await passageiroStore.addPassageiro({ ...passageiro });
    }
    resetForm();
}

function editSelectedPassageiro(pas) {
    Object.assign(passageiro, { ...pas });
}

async function deleteSelectedPassageiro(id) {
    if (confirm('Tem certeza que deseja excluir este passageiro?')) {
        await passageiroStore.deletePassageiro(id);
    }
}
</script>

<template>
    <div>
        <h1>Gerenciamento de Passageiros</h1>

        <!-- Formulário para Adicionar/Editar Passageiro -->
        <form @submit.prevent="submitPassageiro">
            <h2>{{ isEditing ? 'Editar Passageiro' : 'Adicionar Novo Passageiro' }}</h2>
            <div>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" v-model="passageiro.nome" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="passageiro.email" maxlength="50" required />
            </div>
            <div>
                <label for="telefone">Telefone:</label>
                <input type="number" id="telefone" v-model="passageiro.telefone" maxlength="12" required />
            </div> 
            <div>
                <label for="cpf">CPF:</label>
                <input type="number" id="cpf" v-model="passageiro.cpf" maxlength="14" required />
            </div> 
             <div>
                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="date" id="dataNasc" v-model="passageiro.dataNasc" maxlength="10" required />
            </div>
            <div>
                <label for="senha">Senha:</label>
                <input type="text" id="senhas" v-model="passageiro.senha" maxlength="50" required />
            </div>
            <button type="submit">{{ isEditing ? 'Salvar Edição' : 'Adicionar Passageiro' }}</button>
            <button type="button" @click="resetForm">Cancelar</button>
        </form>

        <hr />

        <h2>Lista de Passageiros</h2>
        <table class="passageiro-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pas in passageiroStore.passageiros" :key="pas.id">
                    <td>{{ pas.id }}</td>
                    <td>{{ pas.nome }}</td>
                    <td>{{ pas.email }}</td>
                    <td>{{ pas.telefone }}</td>
                    <td>
                        <button @click="editSelectedPassageiro(pas)">Editar</button>
                        <button @click="deleteSelectePassageiro(pas.id)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
div {
    margin: 20px;
    font-family: sans-serif;
}
form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
form div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
label {
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
    width: 80px;
}
input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
}
button {
    padding: 8px 15px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
}
button:hover {
    background-color: #0056b3;
}
button[type="button"] {
    background-color: #6c757d;
}
button[type="button"]:hover {
    background-color: #545b62;
}

.passageiro-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.passageiro-table th, .passageiro-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.passageiro-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.passageiro-table button {
  margin-right: 5px;
  padding: 6px 10px;
  font-size: 0.85em;
}
</style>