<script setup>
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()
</script>

<template>
    <main :style="{ backgroundColor: themeManager.fundo }">
        <section class="sobre-nos">
            <div :style="{ borderBottom: '2px solid' + themeManager.detalhe }">
                <h1 class="title" :style="{ color: themeManager.text }">
                    SOBRE <span :style="{ color: themeManager.detalheAlternativo }">NÓS!</span>
                </h1>
            </div>
        </section>
        <section>
            <div class="quem-somos">
                <div class="texto">
                    <h2 class="subtitulo" :style="{ color: themeManager.detalheAlternativo }">QUEM SOMOS?</h2>
                    <p :style="{ color: themeManager.text }">
                        Somos um website desenvolvido com o objetivo de facilitar a organização de empresas de
                        transporte de alunos no Instituto Federal Catarinense (IFC) - Câmpus Araquari.<br>
                        A nossa principal funcionalidade é otimizar a locomoção dos alunos no trajeto “casa - escola”,
                        por meio de ferramentas que viabilizem uma melhor comunicação entre empresa e cliente.
                    </p>
                </div>
                <div class="imagem">
                    <img src="/src-sobre/business.png" alt="Quem somos" />
                </div>
            </div>

            <div class="objetivo" :style="{ backgroundColor: themeManager.detalhe }">
                <h2 class="objetivo-titulo">NOSSO OBJETIVO</h2>
                <p>
                    Queremos facilitar a locomoção dos estudantes até o instituto, otimizando o tempo de todos os
                    envolvidos no transporte. Para isso, disponibilizamos diversos serviços, que viabilizam uma melhor
                    experiência para todos.<br>
                    Quando se pensa em estudar no IFC Araquari, deve se pensar em RouterIFC!
                </p>
            </div>

            <div class="saiba-mais">
                <h2 class="saiba-mais-titulo" :style="{ color: themeManager.detalhe }">SAIBA MAIS</h2>
                <div class="saiba-mais-conteudo">
                    <p class="textLeft" :style="{ color: themeManager.text }">
                        Nossos serviços são prestados exclusivamente para o IFC Araquari, um instituto com ensino médio
                        técnico em agropecuária, informática para internet e química, e graduação em agronomia, medicina
                        veterinária, sistemas de informação, ciências agrícolas, química e redes de computadores.

                    </p>
                    <p class="textRight" :style="{ color: themeManager.text, borderColor: themeManager.text }">
                        Caso queira saber mais sobre o Instituto Federal Catarinense - Campus Araquari acesse o site: <a
                            href="https://araquari.ifc.edu.br/" :style="{ color: themeManager.detalheAlternativo }"
                            target="_blank">https://araquari.ifc.edu.br/</a><br /><br />
                        Entre em contato com a RouterIFC para mais informações:<br />
                        emailrouter@gmail.com<br />
                        @instadorouter
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.sobre-nos {
    padding: 110px 120px 0;
    align-items: center;
    text-align: center;
}

.sobre-nos div {
    padding-top: 10%;
    min-height: 80vh;
}

.quem-somos {
    padding: 0 0 0 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quem-somos h2 {
    text-align: left;
}

.quem-somos .texto {
    flex: 1;
}

.quem-somos .imagem {
    flex: 1;
    text-align: center;
}

.quem-somos .imagem img {
    min-width: 500px;
    height: auto;
}

.subtitulo {
    margin-bottom: 20px;
}

.objetivo {
    margin: 0 160px;
    padding: 80px 200px;
    border-radius: 4px;
    color: white;
    text-align: center;
}

.objetivo-titulo {
    margin-bottom: 20px;
}

.saiba-mais {
    margin: 80px 160px 0 160px;
    padding-bottom: 80px;
}

.saiba-mais-titulo {
    text-align: right;
    margin-bottom: 20px;
}

.saiba-mais-conteudo {
    display: flex;
    justify-content: space-between;
}

.saiba-mais-conteudo p {
    width: 50%;
}

.saiba-mais-conteudo .textRight {
    text-align: right;
    padding-left: 20px;
    margin-left: 20px;
    border-left: 2px solid;
}

a {
    text-decoration: underline;
}
</style>
