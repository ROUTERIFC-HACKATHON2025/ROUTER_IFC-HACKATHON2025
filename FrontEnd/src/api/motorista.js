import axios from "axios";

const API_BASE_URL = "http://localhost:8000/motoristas/";

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
}