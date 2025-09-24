import axios from 'axios'

const PASSAGEIROS_URL = 'http://localhost:8000/api/passageiros/'
const MOTORISTAS_URL = 'http://localhost:8000/api/motoristas/'

export default class AdminAPI {
  async fetchPassageiros() {
    const resp = await axios.get(PASSAGEIROS_URL)
    return Array.isArray(resp.data) ? resp.data : []
  }

  async fetchMotoristas() {
    const resp = await axios.get(MOTORISTAS_URL)
    return Array.isArray(resp.data) ? resp.data : []
  }

  async fetchAll() {
    const [passageiros, motoristas] = await Promise.all([
      this.fetchPassageiros(),
      this.fetchMotoristas(),
    ])
    return { passageiros, motoristas }
  }
}


