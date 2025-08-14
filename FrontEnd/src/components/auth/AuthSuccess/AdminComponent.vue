<script setup>
import { ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

const enqueteHoje = ref({
    data: '07/08/2025',
    quemVai: ['João | Motorista 1', 'Maria | Motorista 2', 'Carlos | Motorista 3'],
    quemNaoVai: ['Ana | Motorista 4', 'Pedro | Motorista 5'],
    volta12: ['João | Motorista 1', 'Maria | Motorista 2'],
    volta17: ['Carlos | Motorista 3']
})

const veiculos = ref([
    { nome: 'Van Azul', placa: 'ABC-1234', capacidade: 15 },
    { nome: 'Van Branca', placa: 'DEF-5678', capacidade: 12 },
    { nome: 'Micro-ônibus', placa: 'GHI-9012', capacidade: 25 },
    { nome: 'Van Amarela', placa: 'JKL-3456', capacidade: 18 }
])

const passageiros = ref([
    { nome: 'Ana Paula' }, { nome: 'Carlos' }, { nome: 'Fernanda' },
    { nome: 'José' }, { nome: 'Mariana' }, { nome: 'Rafael' },
    { nome: 'Sofia' }, { nome: 'Lucas' }
])

const motoristas = ref([
    { nome: 'Seu Romano' }, { nome: 'Samucca' }, { nome: 'Paulo' },
    { nome: 'Roberto' }, { nome: 'Lucas' }, { nome: 'Mateus' }, { nome: 'João' }, { nome: 'Maria' }
])
</script>

<template>
    <main class="pagina-gerenciamento">

        <h1 class="titulo" :style="{ color: themeManager.text }">PÁGINA DE <span class="azul"
                :style="{ color: themeManager.detalheAlternativo }">GERENCIAMENTO <br> (NOME DA EMPRESA) </span></h1>
                <p class="footer" :style="{ color: themeManager.text }">
          <button class="link" @click="authState.mudarState('inicio')" :style="{ color: themeManager.detalhe }">
            &larr; Voltar
          </button>
        </p>
        <div class="botoes">
            <button :style="{ backgroundColor: themeManager.detalhe }">VEÍCULOS CADASTRADOS</button>
            <button :style="{ backgroundColor: themeManager.detalheAlternativo }">PASSAGEIROS CADASTRADOS</button>
            <button :style="{ backgroundColor: themeManager.detalheAlternativo }">MOTORISTAS CADASTRADOS</button>
            <button :style="{ backgroundColor: themeManager.detalhe }">ENQUETES ANTERIORES</button>
        </div>

        <section class="enquete" :style="{ color: themeManager.text, borderColor: themeManager.detalheAlternativo }">
            <h2 :style="{ color: themeManager.detalheAlternativo }">ENQUETE</h2>
            <p>{{ enqueteHoje.data }}</p>
            <div class="tabelas" :style="{ borderColor: themeManager.detalhe }">
                <div :style="{ borderColor: themeManager.detalhe }">
                    <h3 :style="{ color: themeManager.detalhe, borderBottom: '2px solid ' + themeManager.detalhe }">Quem vai</h3>
                    <ul>
                        <li :style="{ borderColor: themeManager.detalhe }" v-for="(item, i) in enqueteHoje.quemVai" :key="'vai' + i">{{ item }}</li>
                    </ul>
                </div>
                <div :style="{ borderColor: themeManager.detalhe }">
                    <h3 :style="{ color: themeManager.detalhe, borderBottom: '2px solid ' + themeManager.detalhe }">Quem não vai</h3>
                    <ul>
                        <li :style="{ borderColor: themeManager.detalhe }" v-for="(item, i) in enqueteHoje.quemNaoVai" :key="'naovai' + i">{{ item }}</li>
                    </ul>
                </div>
                <div :style="{ borderColor: themeManager.detalhe }">
                    <h3 :style="{ color: themeManager.detalhe, borderBottom: '2px solid ' + themeManager.detalhe }">Quem volta às 12:00h</h3>
                    <ul>
                        <li :style="{ borderColor: themeManager.detalhe }" v-for="(item, i) in enqueteHoje.volta12" :key="'volta12' + i">{{ item }}</li>
                    </ul>
                </div>
                <div :style="{ borderColor: themeManager.detalhe }">
                    <h3 :style="{ color: themeManager.detalhe, borderBottom: '2px solid ' + themeManager.detalhe }">Quem volta às 17:00h</h3>
                    <ul>
                        <li :style="{ borderColor: themeManager.detalhe }" v-for="(item, i) in enqueteHoje.volta17" :key="'volta17' + i">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="anteriores" :style="{ color: themeManager.text, borderColor: themeManager.detalheAlternativo }">
            <h2 :style="{ color: themeManager.detalheAlternativo }">ENQUETES ANTERIORES</h2>
            <p :style="{ color: themeManager.detalhe }">AGOSTO</p>
            <div class="diaSemana" :style="{ borderColor: themeManager.detalheAlternativo }">
                <p :style="{ color: themeManager.detalheAlternativo }">D</p>
                <p>S</p>
                <p>T</p>
                <p>Q</p>
                <p>Q</p>
                <p>S</p>
                <p :style="{ color: themeManager.detalheAlternativo }">S</p>
            </div>
            <div class="calendario">
                <div class="diaDireita">
                    <p class="dia" v-for="dia in [1, 2]" :key="dia" :style="{ color: dia == 2 ? themeManager.detalheAlternativo : '' }">{{ dia }} </p>

                </div>
                <div>
                    <p v-for="dia in [3, 4, 5, 6, 7, 8, 9]" :key="'d' + dia" class="dia" :style="{ color: dia == 3 || dia == 9 ? themeManager.detalheAlternativo : '' }">{{ dia }} </p>

                </div>
                <div>
                    <p v-for="dia in [10, 11, 12, 13, 14, 15, 16]" :key="'d' + dia" class="dia" :style="{ color: dia == 10 || dia == 16 ? themeManager.detalheAlternativo : '' }">{{ dia }}</p>

                </div>
                <div>
                    <p v-for="dia in [17, 18, 19, 20, 21, 22, 23]" :key="'d' + dia" class="dia" :style="{ color: dia == 17 || dia == 23 ? themeManager.detalheAlternativo : '' }">{{ dia }}</p>

                </div>
                <div>
                    <p v-for="dia in [24, 25, 26, 27, 28, 29, 30]" :key="'d' + dia" class="dia" :style="{ color: dia == 24 || dia == 30 ? themeManager.detalheAlternativo : '' }">{{ dia }}</p>

                </div>
                <div class="diaEsquerda" :style="{ borderColor: themeManager.detalheAlternativo }">
                    <p class="dia" :style="{ color: themeManager.detalheAlternativo }">31</p>
                </div>
            </div>
        </section>

        <section class="veiculos" :style="{ color: '#fff' }">
            <h2 :style="{ color: themeManager.detalheAlternativo }">VEÍCULOS CADASTRADOS</h2>
            <div class="lista-veiculos" >
                <div v-for="(v, i) in veiculos" :key="'v' + i" class="card" >
                    <span class="mdi mdi-bus-school" :style="{ backgroundColor: themeManager.detalhe }"></span>
                    <p :style="{ backgroundColor: themeManager.detalhe }">{{ v.nome }}</p>
                    <p :style="{ backgroundColor: themeManager.detalhe }">{{ v.placa }}</p>
                    <p :style="{ backgroundColor: themeManager.detalhe }">{{ v.capacidade }} pessoas</p>
                </div>
            </div>
        </section>

        <section class="passageiros" :style="{ color: themeManager.text, borderColor: themeManager.detalheAlternativo }">
            <h2 :style="{ color: themeManager.detalheAlternativo }">PASSAGEIROS CADASTRADOS</h2>
            <div class="lista">
                <div v-for="(p, i) in passageiros" :key="'p' + i" class="card">
                    <img src="/public/Ellipse.png" alt="" :style="{ backgroundColor: themeManager.detalhe }">
                    <p :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">{{ p.nome }}</p>
                    <p :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }" class="informacao-adicional">Informação Adicional</p>
                </div>
            </div>
        </section>

        <section class="motoristas" :style="{ color: themeManager.text, borderColor: themeManager.detalheAlternativo }">
            <h2 :style="{ color: themeManager.detalheAlternativo }">MOTORISTAS CADASTRADOS</h2>
            <div class="lista">
                <div v-for="(m, i) in motoristas" :key="'m' + i" class="card">
                    <img src="/public/Ellipse.png" alt="" :style="{ backgroundColor: themeManager.detalhe }">
                    <p :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">{{ m.nome }}</p>
                    <p :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }" class="informacao-adicional">Informação Adicional</p>
                </div>
            </div>
        </section>

    </main>
</template>

<style scoped>
.pagina-gerenciamento {
    text-align: center;
    padding: 20px;
}

.titulo {
    line-height: 1.1;
    font-weight: bold;
    margin: 30px 0 0px 0;
}

.azul {
    font-weight: bold;
}

.link {
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 60px;

}

.botoes {
    display: flex;
    justify-content: space-around;
}

.botoes button {
    color: #fff;
    font-size: 1.7rem;
    border: none;
    width: 300px;
    padding: 10px 15px;
    font-weight: bold;
    cursor: pointer;
}

.enquete {
    padding: 100px 0;
    margin: 0 120px;
    margin-bottom: 20px;
    border-bottom: 2px solid black;
}

.enquete h2 {
    font-weight: bold;
}

.tabelas {
    display: flex;
    justify-content: space-around;
    text-align: left;
    margin-top: 60px;
}

.tabelas div {
    width: 300px;
    height: 500px;
    border: 2px solid black;
    border-radius: 4px;
    text-align: center;
}

.tabelas h3 {
    font-size: 1.7rem;
    font-weight: bold;
    padding: 15px;
    border-bottom: 2px solid black;
}

.tabelas ul {
    list-style: none;
    padding: 0;
}

.tabelas li {
    padding: 10px 0;
    border-bottom: 2px solid black;
}

.anteriores {
    padding: 0 0 100px 0;
        margin: 100px 120px;
    border-bottom: 2px solid black;
}

.anteriores h2 {
    font-weight: bold;
}

.anteriores p {
    font-size: 3.5rem;
    margin: 10px 0;
    font-weight: bold;
}

.diaSemana {
        margin: 0 180px;
    display: flex;
    justify-content: space-between;
    font-size: 1.7rem;
    border-bottom: 1px solid black;
}

.diaSemana p {
    font-size: 2.5rem;
    margin: 0;
}

.calendario {
    margin: 0 180px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.calendario div {
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.calendario .diaDireita {
    display: flex;
    justify-content: right;
}

.calendario .diaEsquerda {
    display: flex;
    justify-content: left;
    border-bottom: 1px solid black;
}

.calendario p {
    display: block;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.calendario .dia {
    margin: 10px 0px;
    font-size: 2rem;
}

.calendario .diaDireita .dia {
    margin: 10px 0px 10px 90px;
}

.veiculos,.passageiros,
.motoristas {
    margin: 100px 120px;
    padding: 0px 0 100px 0;
}

.veiculos, .passageiros{
    border-bottom: 2px solid black;
}

.veiculos h2,
.passageiros h2,
.motoristas h2 {
    font-weight: bold;
    margin-bottom: 50px;
}

.veiculos .lista-veiculos,
.passageiros .lista,
.motoristas .lista {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card {
    text-align: center;
}

.card span {
    border-radius: 4px;
    padding: 20px 80px;
    font-size: 100px;
}

.card img {
    padding: 25px;
    border-radius: 4px;
    width: 150px;
    height: 150px;
}

.passageiros .card p,
.motoristas .card p {
    margin: 0;
}

.card p {
    border-radius: 4px;
    margin: 5px 0;
}

.passageiros .card .informacao-adicional,
.motoristas .card .informacao-adicional {
    font-size: 12px;
    margin-top: 5px;
    padding: 5px 5px 30px 5px;
}


</style>
