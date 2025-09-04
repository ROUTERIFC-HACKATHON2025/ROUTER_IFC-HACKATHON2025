import axios from "axios";

const API_BASE_URL = "http://localhost:8000/passageiros/";

export default class PassageirosAPI {
    async getPassageirosAll() {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar passageiros:", error);
            throw error;
        }
    }

    async addPassageiro(passageiro) {
        try {
            const response = await axios.post(API_BASE_URL, passageiros);
            return response.data;
        } catch (error) {
            console.error("Erro ao adicionar passageiros:", error);
            throw error;
        }
    }

    async updatePassageiro(passageiro) {
        try {
            const url = `${API_BASE_URL}${passageiros.id}/`;
            const response = await axios.put(url, passageiros);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar passageiros:", error);
            throw error;
        }
    }

    async deletePassageiro(id) {
        try {
            const url = `${API_BASE_URL}${id}/`;
            const response = await axios.delete(url);
            return response;
        } catch (error) {
            console.error("Erro ao excluir passageiros:", error);
            throw error;
        }
    }
}