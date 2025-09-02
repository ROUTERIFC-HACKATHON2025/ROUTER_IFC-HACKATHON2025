import { ref } from 'vue'
import { defineStore } from 'pinia'

import MotoristaAPI from '@/api/motorista'

const motoristaApi = new MotoristaAPI();

export const useMotoristaStore = defineStore('motorista', () => {
    const motoristas = ref([]);

    async function getMotoristas() {
        try {
            const data = await motoristaApi.getMotoristasAll();
            motoristas.value = data;
        } catch (error) {
            console.error("Erro no store ao buscar motoristas:", error);
            throw error;
        }
    }

    async function addMotorista(motoristaParaAdicionar) {
        try {
            const novaMotorista = await motoristaApi.addMotorista(motoristaParaAdicionar);
            motoristas.value.push(novaMotorista);
        } catch (error) {
            console.error("Erro no store ao adicionar motorista:", error);
            throw error;
        }
    }

    async function updateMotorista(motoristaParaAtualizar) {
        try {
            const motoristaAtualizada = await motoristaApi.updateMotorista(motoristaParaAtualizar);
            const index = motoristas.value.findIndex(cid => cid.id === motoristaAtualizada.id);
            if (index !== -1) {
                motoristas.value[index] = motoristaAtualizada;
            }
        } catch (error) {
            console.error("Erro no store ao atualizar motorista:", error);
            throw error;
        }
    }

    async function deleteMotorista(idParaExcluir) {
        try {
            await motoristaApi.deleteMotorista(idParaExcluir);
            motoristas.value = motoristas.value.filter(cid => cid.id !== idParaExcluir);
        } catch (error) {
            console.error("Erro no store ao excluir motorista:", error);
            throw error;
        }
    }

    return {
        motoristas,
        getMotoristas,
        addMotorista,
        updateMotorista,
        deleteMotorista
    };
});