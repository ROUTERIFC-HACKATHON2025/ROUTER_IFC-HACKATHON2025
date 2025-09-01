import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserProfileStore = defineStore('userProfile', () => {
  const nomePassageiro = ref('João Silva')
  const telefonePassageiro = ref('(47) 99999-9999')
  const emailPassageiro = ref('joao.silva@email.com')
  const senhaPassageiro = ref('123456')
  const nascimentoPassageiro = ref('1990-01-01')

  const atualizarPerfilPassageiro = (novosDados) => {
    nomePassageiro.value = novosDados.nomePassageiro
    telefonePassageiro.value = novosDados.telefonePassageiro
    emailPassageiro.value = novosDados.emailPassageiro
    senhaPassageiro.value = novosDados.senhaPassageiro
    nascimentoPassageiro.value = novosDados.nascimentoPassageiro
  }

  const nomeMotorista = ref('Pedro')
  const telefoneMotorista = ref('(47) 99999-9999')
  const emailMotorista = ref('pedro@email.com')
  const senhaMotorista = ref('123456')
  const nascimentoMotorista = ref('1990-01-01')

  const atualizarPerfilMotorista = (novosDados) => {
    nomeMotorista.value = novosDados.nomeMotorista
    telefoneMotorista.value = novosDados.telefoneMotorista
    emailMotorista.value = novosDados.emailMotorista
    senhaMotorista.value = novosDados.senhaMotorista
    nascimentoMotorista.value = novosDados.nascimentoMotorista
  }

  const vans = ref([
    {
      id: 0,
      nome: 'Van Executiva Premium',
      modelo: 'Sprinter 515 CDI',
      placa: 'ABC-1234',
      acentos: 18,
      ano: 2022,
      cor: 'Branco Perolado',
      marca: 'Mercedes-Benz',
      caracteristicas: ['Ar condicionado', 'Wi-Fi', 'USB', 'Assentos reclináveis', 'Teto solar'],
      status: 'Ativo'
    },
    {
      id: 1,
      nome: 'Van Comfort Plus',
      modelo: 'Master 2.3 dCi',
      placa: 'DEF-5678',
      acentos: 16,
      ano: 2021,
      cor: 'Prata Metálico',
      marca: 'Renault',
      caracteristicas: ['Ar condicionado', 'Wi-Fi', 'USB', 'Sistema de som premium'],
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Van Business Class',
      modelo: 'Crafter 2.0 TDI',
      placa: 'GHI-9012',
      acentos: 20,
      ano: 2023,
      cor: 'Preto',
      marca: 'Volkswagen',
      caracteristicas: ['Ar condicionado', 'Wi-Fi', 'USB', 'Assentos executivos', 'Porta automática'],
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Van Express',
      modelo: 'Ducato 2.3 Multijet',
      placa: 'JKL-3456',
      acentos: 14,
      ano: 2020,
      cor: 'Azul Metálico',
      marca: 'Fiat',
      caracteristicas: ['Ar condicionado', 'USB', 'Assentos confortáveis'],
      status: 'Manutenção'
    },
    {
      id: 4,
      nome: 'Van Corporate',
      modelo: 'Boxer 2.2 HDi',
      placa: 'MNO-7890',
      acentos: 22,
      ano: 2023,
      cor: 'Cinza Metálico',
      marca: 'Peugeot',
      caracteristicas: ['Ar condicionado', 'Wi-Fi', 'USB', 'Assentos premium', 'Teto alto'],
      status: 'Ativo'
    },
    {
      id: 5,
      nome: 'Van Elite',
      modelo: 'Sprinter 316 CDI',
      placa: 'PQR-1234',
      acentos: 18,
      ano: 2022,
      cor: 'Branco',
      marca: 'Mercedes-Benz',
      caracteristicas: ['Ar condicionado', 'Wi-Fi', 'USB', 'Assentos reclináveis', 'Sistema de navegação'],
      status: 'Ativo'
    },
  ])

  const passageiros = ref([
    {
      id: 0,
      nome: 'Maria Fernanda Santos',
      nascimento: '1995-03-15',
      cpf: '123.456.789-01',
      email: 'maria.santos@email.com',
      senha: '123456',
      telefone: '(47) 98888-7777',
      endereco: 'Rua das Flores, 123 - Centro, Blumenau/SC',
      descricao: 'Estudante de Engenharia Civil na FURB, apaixonada por sustentabilidade e inovação.'
    },
    {
      id: 1,
      nome: 'Carlos Eduardo Oliveira',
      nascimento: '1988-07-22',
      cpf: '987.654.321-09',
      email: 'carlos.oliveira@empresa.com',
      senha: '123456',
      telefone: '(47) 97777-6666',
      endereco: 'Av. Brasil, 456 - Itoupava Seca, Blumenau/SC',
      descricao: 'Analista de Sistemas na empresa TechCorp. Entusiasta de tecnologia e corrida de rua.'
    },
    {
      id: 2,
      nome: 'Juliana Pereira Costa',
      nascimento: '2001-11-30',
      cpf: '456.789.123-00',
      email: 'juliana.costa@outlook.com',
      senha: '123456',
      telefone: '(47) 96666-5555',
      endereco: 'Rua Bahia, 789 - Velha, Blumenau/SC',
      descricao: 'Designer gráfica freelancer. Ama arte digital e fotografia.'
    },
    {
      id: 3,
      nome: 'Rafael Lima Andrade',
      nascimento: '1992-02-10',
      cpf: '321.654.987-55',
      email: 'rafael.andrade@gmail.com',
      senha: '123456',
      telefone: '(47) 95555-4444',
      endereco: 'Rua São Paulo, 321 - Garcia, Blumenau/SC',
      descricao: 'Professor de História no ensino médio. Apaixonado por leitura e viagens.'
    },
    {
      id: 4,
      nome: 'Fernanda Alves Rodrigues',
      nascimento: '1999-09-25',
      cpf: '789.123.456-77',
      email: 'fernanda.rodrigues@yahoo.com',
      senha: '123456',
      telefone: '(47) 94444-3333',
      endereco: 'Rua XV de Novembro, 654 - Centro, Blumenau/SC',
      descricao: 'Estudante de Medicina na FURB. Interessada em saúde pública e esportes.'
    }
  ])

  const usuarioAtual = ref(null)

  function setUsuarioAtual(passageiro) {
    usuarioAtual.value = passageiro
  }

  function atualizarPerfil(dados) {
    if (usuarioAtual.value) {
      Object.assign(usuarioAtual.value, dados)
    }
  }

  const motoristas = ref([
    {
      id: 0,
      nome: 'João Carlos Ferreira',
      nascimento: '1980-12-05',
      cpf: '111.222.333-44',
      email: 'joao.ferreira@transporte.com',
      telefone: '(47) 93333-2222',
      endereco: 'Rua dos Motoristas, 100 - Centro, Blumenau/SC',
      descricao: 'Motorista profissional há 15 anos. Possui CNH categoria D e E. Especializado em transporte executivo e escolar. Experiência com vans de 18 lugares.'
    },
    {
      id: 1,
      nome: 'Pedro Henrique Almeida',
      nascimento: '1983-06-18',
      cpf: '555.666.777-88',
      email: 'pedro.almeida@vanexpress.com',
      telefone: '(47) 92222-1111',
      endereco: 'Av. dos Transportes, 200 - Itoupava Norte, Blumenau/SC',
      descricao: 'Motorista com 12 anos de experiência. CNH categoria D. Conhece muito bem as rotas de Blumenau e região. Especializado em transporte corporativo.'
    },
    {
      id: 2,
      nome: 'Antônio Roberto Santos',
      nascimento: '1978-02-25',
      cpf: '999.888.777-66',
      email: 'antonio.santos@premiumvan.com',
      telefone: '(47) 91111-0000',
      endereco: 'Rua das Vans, 300 - Velha, Blumenau/SC',
      descricao: 'Motorista sênior com 20 anos de experiência. CNH categoria D e E. Especializado em transporte de alto padrão. Conhecimento avançado em mecânica básica.'
    },
    {
      id: 3,
      nome: 'Marcos Vinícius Costa',
      nascimento: '1987-08-14',
      cpf: '444.333.222-11',
      email: 'marcos.costa@businessvan.com',
      telefone: '(47) 90000-9999',
      endereco: 'Rua Business, 400 - Centro, Blumenau/SC',
      descricao: 'Motorista jovem e dinâmico com 8 anos de experiência. CNH categoria D. Especializado em atendimento ao cliente e pontualidade. Conhece todas as rotas da cidade.'
    },
    {
      id: 4,
      nome: 'Ricardo Augusto Lima',
      nascimento: '1982-10-03',
      cpf: '777.888.999-00',
      email: 'ricardo.lima@executivevan.com',
      telefone: '(47) 98888-7777',
      endereco: 'Av. Executiva, 500 - Garcia, Blumenau/SC',
      descricao: 'Motorista executivo com 18 anos de experiência. CNH categoria D e E. Especializado em transporte de executivos e eventos corporativos. Inglês intermediário.'
    }
  ])

  return {
    nomePassageiro,
    telefonePassageiro,
    emailPassageiro,
    senhaPassageiro,
    nascimentoPassageiro,
    atualizarPerfilPassageiro,
    nomeMotorista,
    telefoneMotorista,
    emailMotorista,
    senhaMotorista,
    nascimentoMotorista,
    atualizarPerfilMotorista,
    vans,
    passageiros,
    motoristas,
    usuarioAtual, setUsuarioAtual, atualizarPerfil
  }
})
