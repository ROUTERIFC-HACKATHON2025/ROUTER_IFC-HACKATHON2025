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
            const response = await axios.post(API_BASE_URL, passageiro);
            return response.data;
        } catch (error) {
            console.error("Erro ao adicionar passageiro:", error);
            throw error;
        }
    }

    async updatePassageiro(passageiro) {
        try {
            const url = `${API_BASE_URL}${passageiro.idPassageiros}/`;
            const response = await axios.put(url, passageiro);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar passageiro:", error);
            throw error;
        }
    }

    async deletePassageiro(idPassageiro) {
        try {
            const url = `${API_BASE_URL}${idPassageiro}/`;
            const response = await axios.delete(url);
            return response;
        } catch (error) {
            console.error("Erro ao excluir passageiro:", error);
            throw error;
        }
    }
}
