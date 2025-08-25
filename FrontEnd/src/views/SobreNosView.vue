<script setup>
import { onMounted, nextTick } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()

onMounted(async () => {
  await nextTick()

  const animateElements = () => {
    const elements = document.querySelectorAll('.animate-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        } else {
          entry.target.classList.remove('in-view')
        }
      })
    }, { threshold: 0.1 })

    elements.forEach(el => observer.observe(el))
  }

  animateElements()

  // Re-observe os elementos caso a página seja rolada ou elementos sejam adicionados dinamicamente
  window.addEventListener('scroll', () => {
    animateElements()
  })
})
</script>

<template>
  <!-- Notebook -->
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo }">
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.text }">
          SOBRE <span :style="{ color: themeManager.detalheAlternativo }">NÓS!</span>
        </h1>
      </div>
    </section>

    <section>
      <div class="quem-somos animate-on-scroll">
        <div class="texto animate-on-scroll">
          <h2 class="subtitulo animate-on-scroll" :style="{ color: themeManager.detalheAlternativo }">QUEM SOMOS?</h2>
          <p :style="{ color: themeManager.text }">
            Somos um website desenvolvido com o objetivo de facilitar a organização de empresas de
            transporte de alunos no Instituto Federal Catarinense (IFC) - Câmpus Araquari.<br>
            A nossa principal funcionalidade é otimizar a locomoção dos alunos no trajeto “casa - escola”,
            por meio de ferramentas que viabilizem uma melhor comunicação entre empresa e cliente.
          </p>
        </div>
        <div class="imagem animate-on-scroll">
          <img src="/src-sobre/business.png" alt="Quem somos" />
        </div>
      </div>

      <div class="objetivo animate-on-scroll" :style="{ backgroundColor: themeManager.detalhe }">
        <h2 class="objetivo-titulo animate-on-scroll">NOSSO OBJETIVO</h2>
        <p>
          Queremos facilitar a locomoção dos estudantes até o instituto, otimizando o tempo de todos os
          envolvidos no transporte. Para isso, disponibilizamos diversos serviços, que viabilizam uma melhor
          experiência para todos.<br>
          Quando se pensa em estudar no IFC Araquari, deve se pensar em RouterIFC!
        </p>
      </div>

      <div class="saiba-mais animate-on-scroll">
        <h2 class="saiba-mais-titulo animate-on-scroll" :style="{ color: themeManager.detalhe }">SAIBA MAIS</h2>
        <div class="saiba-mais-conteudo">
          <p class="textLeft animate-on-scroll" :style="{ color: themeManager.text }">
            Nossos serviços são prestados exclusivamente para o IFC Araquari, um instituto com ensino médio
            técnico em agropecuária, informática para internet e química, e graduação em agronomia, medicina
            veterinária, sistemas de informação, ciências agrícolas, química e redes de computadores.
          </p>
          <p class="textRight animate-on-scroll" :style="{ color: themeManager.text, borderColor: themeManager.text }">
            Caso queira saber mais sobre o Instituto Federal Catarinense - Campus Araquari acesse o site: 
            <a href="https://araquari.ifc.edu.br/" :style="{ color: themeManager.detalheAlternativo }" target="_blank">
              https://araquari.ifc.edu.br/
            </a><br /><br />
            Entre em contato com a RouterIFC para mais informações:<br />
            <a href="mailto: routerifc@gmail.com" :style="{ color: themeManager.detalheAlternativo}">routerifc@gmail.com</a><br />
            <a href="https://www.instagram.com/routerifc" target="_blank" :style="{ color: themeManager.detalheAlternativo }">@routerifc</a>
          </p>
        </div>
      </div>
    </section>
  </main>

  <!-- Celular -->
  <main class="celular" :style="{ backgroundColor: themeManager.fundo }">
    <section class="sobre-nos animate-on-scroll">
      <div>
        <h1 class="title animate-on-scroll" :style="{ color: themeManager.text, borderBottom: '2px solid ' + themeManager.detalheAlternativo }">
          SOBRE <span :style="{ color: themeManager.detalheAlternativo }">NÓS!</span>
        </h1>
        <img class="animate-on-scroll" src="/src-sobre/business.png" alt="Quem somos" />
      </div>
    </section>

    <section>
      <div class="quem-somos animate-on-scroll">
        <div class="texto animate-on-scroll">
          <h2 class="subtitulo animate-on-scroll" :style="{ color: themeManager.detalheAlternativo }">QUEM SOMOS?</h2>
          <p :style="{ color: themeManager.text }">
            Somos um website desenvolvido com o objetivo de facilitar a organização de empresas de
            transporte de alunos no Instituto Federal Catarinense (IFC) - Câmpus Araquari.<br>
            A nossa principal funcionalidade é otimizar a locomoção dos alunos no trajeto “casa - escola”,
            por meio de ferramentas que viabilizem uma melhor comunicação entre empresa e cliente.
          </p>
        </div>
      </div>

      <div class="objetivo animate-on-scroll" :style="{ backgroundColor: themeManager.detalhe }">
        <h2 class="objetivo-titulo animate-on-scroll">NOSSO OBJETIVO</h2>
        <p>
          Queremos facilitar a locomoção dos estudantes até o instituto, otimizando o tempo de todos os
          envolvidos no transporte. Para isso, disponibilizamos diversos serviços, que viabilizam uma melhor
          experiência para todos.<br>
          Quando se pensa em estudar no IFC Araquari, deve se pensar em RouterIFC!
        </p>
      </div>

      <div class="saiba-mais animate-on-scroll">
        <h2 class="saiba-mais-titulo animate-on-scroll" :style="{ color: themeManager.detalhe }">SAIBA MAIS</h2>
        <div class="saiba-mais-conteudo">
          <p class="textLeft animate-on-scroll" :style="{ color: themeManager.text }">
            Nossos serviços são prestados exclusivamente para o IFC Araquari, um instituto com ensino médio
            técnico em agropecuária, informática para internet e química, e graduação em agronomia, medicina
            veterinária, sistemas de informação, ciências agrícolas, química e redes de computadores.
          </p>
          <p class="textRight animate-on-scroll" :style="{ color: themeManager.text, borderColor: themeManager.text }">
            Caso queira saber mais sobre o Instituto Federal Catarinense - Campus Araquari acesse o site: 
            <a href="https://araquari.ifc.edu.br/" :style="{ color: themeManager.detalheAlternativo }" target="_blank">
              https://araquari.ifc.edu.br/
            </a><br /><br />
            Entre em contato com a RouterIFC para mais informações:<br />
            <a href="mailto:routerifc@gmail.com" :style="{ color: themeManager.detalheAlternativo}">routerifc@gmail.com</a><br />
            <a href="https://www.instagram.com/routerifc" target="_blank" :style="{ color: themeManager.detalheAlternativo }">@routerifc</a>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(.2, .65, .25, 1);
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
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

@media (max-width: 768px) {
    .sobre-nos {
    padding: 230px 0 0 0;
    align-items: center;
    text-align: center;
}

.sobre-nos div {
    display: block;
    justify-content: center;
    text-align: center;
    gap: 0px;
    min-height: 30vh;
    padding-top: 0;
}

img {
    min-width: 10px;
    width: 400px;
    height: auto;
}

  h1 {
    padding-bottom: 20px;
    margin: 0 40px;
  }

  .quem-somos {
    padding: 0 20px 50px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quem-somos h2 {
    text-align: center;
    font-size: 2rem;
}

.quem-somos .texto {
    flex: 1;
    text-align: justify;
}

.subtitulo {
    margin-bottom: 20px;
}

.objetivo {
    margin: 0 10px;
    padding: 15px;
    border-radius: 4px;
    color: white;
    text-align: justify;
}

.objetivo-titulo {
    margin-bottom: 20px;
}

.saiba-mais {
    margin: 50px 20px 0 20px;
    padding-bottom: 80px;
}

.saiba-mais-titulo {
    text-align: right;
    margin-bottom: 20px;
}

.saiba-mais-conteudo {
    display: block;
    justify-content: space-between;
}

.saiba-mais-conteudo p {
    width: 100%;
}

.saiba-mais-conteudo .textRight {
    text-align: right;
    padding-left: 0px;
    margin-left: 0px;
    border-left: none;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid;
}
}
</style>
