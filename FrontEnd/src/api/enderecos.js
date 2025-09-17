import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/enderecos/";

// Função para obter headers com autenticação
function getAuthHeaders() {
    const token = localStorage.getItem('jwt_access');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
}

export default class EnderecosAPI {
    async getEnderecosAll() {
        try {
            const response = await axios.get(API_BASE_URL, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar endereços:", error);
            throw error;
        }
    }

    async addEndereco(endereco) {
        try {
            console.log("Tentando adicionar endereço:", endereco);
            const response = await axios.post(API_BASE_URL, endereco, {
                headers: getAuthHeaders()
            });
            console.log("Endereço adicionado com sucesso:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error);
            console.error("Detalhes do erro:", error.response?.data);
            throw error;
        }
    }

    async updateEndereco(endereco) {
        try {
            const url = `${API_BASE_URL}${endereco.idEndereco}/`;
            const response = await axios.put(url, endereco, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            throw error;
        }
    }

    async deleteEndereco(idEndereco) {
        try {
            const url = `${API_BASE_URL}${idEndereco}/`;
            const response = await axios.delete(url, {
                headers: getAuthHeaders()
            });
            return response;
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
            throw error;
        }
    }

    async associarEnderecoPassageiro(idPassageiro, idEndereco) {
        try {
            const response = await axios.put(`http://localhost:8000/api/passageiros/${idPassageiro}/`, {
                endereco: [idEndereco]
            }, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao associar endereço ao passageiro:", error);
            throw error;
        }
    }
}
