<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useMotoristaStore } from '@/stores/motorista'

const motoristaStore = useMotoristaStore();

const defaultMotorista = { idMotorista: 0, nome: '', email: '', telefone: '', cpf: '', codigoCnh: '', senha: '' };
const motorista = reactive({ ...defaultMotorista });

const isEditing = computed(() => motorista.idMotorista !== 0);

onMounted(async () => {
    await motoristaStore.getMotoristas();
})



async function submitMotorista() {
    
}

function editSelectedMotorista(idMotorista) {
    const mot = motoristaStore.motoristas.find(m => m.idMotorista === idMotorista);
    if (mot) {
        Object.assign(motorista, { ...mot });
    }
}

async function deleteSelectedMotorista(idMotorista) {
    if (confirm('Tem certeza que deseja excluir este motorista?')) {
        await motoristaStore.deleteMotorista(idMotorista);
    }
}
</script>

<template>
    <div>
        <h1>Gerenciamento de Motoristas</h1>

        <!-- Formulário para Adicionar/Editar Motorista -->
        <form @submit.prevent="submitMotorista">
            <h2>{{ isEditing ? 'Editar Motorista' : 'Adicionar Novo Motorista' }}</h2>
            <div>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" v-model="motorista.nome" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="motorista.email" maxlength="50" required />
            </div>
            <div>
                <label for="telefone">Telefone:</label>
                <input type="text" id="telefone" v-model="motorista.telefone" maxlength="12" required />
            </div>
            <div>
                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" v-model="motorista.cpf" maxlength="14" required />
            </div>
            <div>
                <label for="cnh">Codigo da CNH:</label>
                <input type="text" id="cnh" v-model="motorista.codigoCnh" maxlength="14" required />
            </div>
            <div>
                <label for="senha">Senha:</label>
                <input type="text" id="senha" v-model="motorista.senha" maxlength="50" required />
            </div>
            <button type="submit">{{ isEditing ? 'Salvar Edição' : 'Adicionar Motorista' }}</button>
            <button type="button" @click="resetForm">Cancelar</button>
        </form>

        <hr />

        <h2>Lista de Motoristas</h2>
        <table class="motorista-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th>CNH</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mot in motoristaStore.motoristas" :key="mot.idMotorista">
                    <td>{{ mot.idMotorista }}</td>
                    <td>{{ mot.nome }}</td>
                    <td>{{ mot.email }}</td>
                    <td>{{ mot.telefone }}</td>
                    <td>{{ mot.cpf }}</td>
                    <td>{{ mot.codigoCnh }}</td>
                    <td>
                        <button @click="editSelectedMotorista(mot.idMotorista)">Editar</button>
                        <button @click="deleteSelectedMotorista(mot.idMotorista)">Excluir</button>
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

.motorista-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.motorista-table th, .motorista-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.motorista-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.motorista-table button {
  margin-right: 5px;
  padding: 6px 10px;
  font-size: 0.85em;
}
</style>