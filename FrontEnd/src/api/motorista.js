import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/motoristas/";

export default class MotoristaAPI {
    async getMotoristasAll() {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar motoristas:", error);
            throw error;
        }
    }

    async addMotorista(motorista) {
        try {
            const response = await axios.post(API_BASE_URL, motorista);
            return response.data;
        } catch (error) {
            console.error("Erro ao adicionar motorista:", error);
            throw error;
        }
    }

    async updateMotorista(motorista) {
        try {
            const url = `${API_BASE_URL}${motorista.idMotorista}/`;
            const response = await axios.put(url, motorista);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar motorista:", error);
            throw error;
        }
    }

    async deleteMotorista(idMotorista) {
        try {
            const url = `${API_BASE_URL}${idMotorista}/`;
            const response = await axios.delete(url);
            return response;
        } catch (error) {
            console.error("Erro ao excluir motorista:", error);
            throw error;
        }
    }

    async atualizarLocalizacao(idMotorista, { latitude, longitude, rota_ativa }) {
        try {
            const url = `${API_BASE_URL}${idMotorista}/atualizar-localizacao/`;
            const response = await axios.post(url, { latitude, longitude, rota_ativa });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar localização do motorista:", error);
            throw error;
        }
    }

    async obterLocalizacaoAtual(idMotorista) {
        try {
            const url = `${API_BASE_URL}${idMotorista}/localizacao-atual/`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter localização do motorista:", error);
            throw error;
        }
    }
}
