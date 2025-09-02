import { ref } from 'vue'
import { defineStore } from 'pinia'
import PassageirosAPI from '@/api/passageiros'

const passageirosApi = new PassageirosAPI();

export const usePassageiroStore = defineStore('passageiro', () => {
    const passageiros = ref([]);

    async function getPassageiros() {
        try {
            const data = await passageirosApi.getPassageirosAll();
            passageiros.value = data;
        } catch (error) {
            console.error("Erro no store ao buscar passageiros:", error);
            throw error;
        }
    }

    async function addPassageiro(passageiroParaAdicionar) {
        try {
            const novoPassageiro = await passageirosApi.addPassageiro(passageiroParaAdicionar);
            passageiros.value.push(novoPassageiro);
        } catch (error) {
            console.error("Erro no store ao adicionar empresa:", error);
            throw error;
        }
    }

    async function updatePassageiro(passageiroParaAtualizar) {
        try {
            const passageiroAtualizado = await passageirosApi.updatePassageiro(passageiroParaAtualizar);
            const index = passageiros.value.findIndex(pass => pass.id === passageiroAtualizado.id);
            if (index !== -1) {
                passageiros.value[index] = passageiroAtualizado;
            }
        } catch (error) {
            console.error("Erro no store ao atualizar passageiro:", error);
            throw error;
        }
    }

    async function deletePassageiro(idParaExcluir) {
        try {
            await passageirosApi.deletePassageiro(idParaExcluir);
            passageiros.value = passageiros.value.filter(pass => pass.id !== idParaExcluir);
        } catch (error) {
            console.error("Erro no store ao excluir passageiro:", error);
            throw error;
        }
    }

    return { passageiros, getPassageiros, addPassageiro, updatePassageiro, deletePassageiro };

});