<script setup>
import { useThemeManagerStore } from '@/stores/theme/themeManager';
import { onMounted, nextTick } from 'vue';

const themeManager = useThemeManagerStore();

onMounted(async () => {
  await nextTick();

  const animateElements = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }

  animateElements();

  window.addEventListener('scroll', () => {
    animateElements();
  });
})
</script>

<template>
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.detalhe }">
          INDY TOUR
        </h1>
      </div>
    </section>
    <section class="empresas animate-on-scroll">
      <div class="descricao animate-on-scroll fade-in-left">
        <p>
          A IndyTour, criada em 2020, é uma empresa de transporte por vans que atende os estudantes do Instituto Federal
          Catarinense - Campus Araquari (IFC) com segurança, pontualidade e conforto. Fundada por motoristas
          experientes, surgiu para facilitar o acesso à escola, principalmente para alunos que moram longe. Com veículos
          bem cuidados, rotas organizadas e motoristas capacitados, a IndyTour se tornou uma parceira importante na
          rotina escolar, ajudando os estudantes a chegarem ao campus com tranquilidade todos os dias.
        </p>
        <img class="animate-on-scroll fade-in-right" src="/src-empresa/Logoindytour.png" alt="Ilustração empresa" :style="{ borderColor: themeManager.text }" />
      </div>
    </section>
    <section class="preco animate-on-scroll">
      <h2 :style="{ color: themeManager.detalhe }">INFORMAÇÕES IMPORTANTES</h2>
      <div class="preco-content">
        <div class="info">
          <div class="info-div">
            <h3 :style="{ color: themeManager.detalhe }">DOCUMENTAÇÃO NECESSÁRIA:</h3>
            <ul :style="{ color: themeManager.text }">
              <li>CPF ou CNPJ do contratante</li>
              <li>Lista detalhada dos itens</li>
              <li>Endereços completos</li>
            </ul>
          </div>
          <div class="info-div">
            <h3 :style="{ color: themeManager.detalhe }">ENDEREÇOS:</h3>
            <ul :style="{ color: themeManager.text }">
              <li>R. Faustino Busarello, 520 - Boehmerwald,<br></br> Joinville - SC, 89235-330</li>
            </ul>
          </div>
          <div class="info-div">
            <h3 :style="{ color: themeManager.detalhe }">MENSALIDADE:</h3>
            <ul :style="{ color: themeManager.text }">
              <li>Dinheiro, PIX, Cartões</li>
              <li>11x de R$ 600,00</li>
              <li>12x de R$ 550,00</li>
            </ul>
          </div>
        </div>
        <div class="solicite" :style="{ backgroundColor: themeManager.detalhe }">
          <h3>SOLICITE SEU ORÇAMENTO</h3>
          <P>(47) 99221-4606</P>
          <P>@indy_tour</P>
          <button class="solicite-button" :style="{ color: themeManager.detalhe }">SOLICITAR ORÇAMENTO</button>
        </div>
      </div>
    </section>
  </main>
  <main class="celular" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.detalhe }">
          INDY TOUR
        </h1>
      </div>
    </section>
    <section class="empresas animate-on-scroll">
      <div class="descricao animate-on-scroll">
        <img src="/src-empresa/Logoindytour.png" alt="Ilustração empresa" :style="{ borderColor: themeManager.text }" />
        <p>
          A IndyTour, criada em 2020, é uma empresa de transporte por vans que atende os estudantes do Instituto Federal
          Catarinense - Campus Araquari (IFC) com segurança, pontualidade e conforto. Fundada por motoristas
          experientes, surgiu para facilitar o acesso à escola, principalmente para alunos que moram longe. Com veículos
          bem cuidados, rotas organizadas e motoristas capacitados, a IndyTour se tornou uma parceira importante na
          rotina escolar, ajudando os estudantes a chegarem ao campus com tranquilidade todos os dias.
        </p>
      </div>
    </section>
    <section class="preco animate-on-scroll">
      <h2 :style="{ color: themeManager.detalhe }">INFORMAÇÕES IMPORTANTES</h2>
      <div class="preco-content">
        <div class="info">
          <div class="info-div">
            <h3 :style="{ color: themeManager.detalhe }">DOCUMENTAÇÃO:</h3>
            <ul :style="{ color: themeManager.text }">
              <li>CPF ou CNPJ do contratante</li>
              <li>Lista detalhada dos itens</li>
              <li>Endereços completos</li>
            </ul>
          </div>
          <div class="info-div">
            <h3 :style="{ color: themeManager.detalhe }">ENDEREÇOS:</h3>
            <ul :style="{ color: themeManager.text }">
              <li>R. Faustino Busarello, 520 - Boehmerwald,<br></br> Joinville - SC, 89235-330</li>
            </ul>
          </div>
          <div class="info-div">
            <h3 :style="{ color: themeManager.detalhe }">MENSALIDADE:</h3>
            <ul :style="{ color: themeManager.text }">
              <li>Dinheiro, PIX, Cartões</li>
              <li>11x de R$ 600,00</li>
              <li>12x de R$ 550,00</li>
            </ul>
          </div>
        </div>
        <div class="solicite" :style="{ backgroundColor: themeManager.detalhe }">
          <h3>SOLICITE SEU ORÇAMENTO</h3>
          <P>(47) 99221-4606</P>
          <P>@indy_tour</P>
          <button class="solicite-button" :style="{ color: themeManager.detalhe }">SOLICITAR ORÇAMENTO</button>
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

.fade-in-left {
  transform: translateX(-50px);
}

.fade-in-left.in-view {
  transform: translateX(0);
}

.fade-in-right {
  transform: translateX(50px);
}

.fade-in-right.in-view {
  transform: translateX(0);
}

h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.sobre-nos {
  padding: 20px 120px 0;
  align-items: center;
  text-align: center;
}

.sobre-nos div {
  padding-top: 10%;
  min-height: 33vh;
}

.empresas .descricao {
  padding: 40px 160px 50px 160px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.empresas p {
  max-width: 600px;
}

.empresas img {
  width: 300px;
  height: 300px;
  border-radius: 100%;
  border: 2px solid;
}

.preco {
  padding: 0 50px 50px 50px;
}

.preco h2 {
  margin-bottom: 40px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.preco-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.info {
  margin-left: 5%;
  padding: 0px 0 20px 50px;
}

.info-div {
  margin-bottom: 20px; 
}

.info h3 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 1.8rem;
}

.info p {
  margin: 10px 0;
  font-size: 1.2rem;
}

.info p strong {
  font-weight: bold;
  text-decoration: underline;
}

.solicite {
  text-align: left;
  padding: 30px 50px;
  border-radius: 30px;
  width: 550px;
  margin-right: 60px;
}

.solicite h3 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.solicite p {
  margin: 5px 0;
  font-size: 1rem;
  color: #fff;
  font-weight: 100;
}

.solicite-button {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  transition: transform 0.3s ease;
}

.solicite-button:hover {
  transform: scale(1.05);
}



@media (max-width: 768px) {
 .sobre-nos {
    padding: 200px 20px 0 20px;
    align-items: center;
    text-align: center;
  }

  .sobre-nos div {
    display: block;
    justify-content: center;
    text-align: center;
    gap: 0px;
    min-height: 10vh;
    padding-top: 0;
  }

  

  h1 {
    padding-bottom: 20px;
    margin: 20px 0px;
  }

  .empresas .descricao {
    flex-direction: column;
    padding: 20px 20px 50px 20px;
    margin-bottom: 50px;
    text-align: center;
  }

  .empresas p {
    max-width: 100%;
    padding: 0;
    text-align: justify;
  }

  .empresas img {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }

  .preco {
    padding: 0 20px 50px 20px;
  }

  .preco-content {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  h2 {
    font-size: 2.3rem;
  }

  .info {
    margin: 0;
    padding: 0;
  }

  .info-div {
    margin-bottom: 10px; 
  }

  .info h3 {
    font-size: 1.3rem;
  }

  .info p {
    font-size: 1rem;
  }

  .solicite {
    width: 100%;
    margin: 0;
    padding: 20px;
  }

  .solicite h3 {
    font-size: 1.3rem;
  }

  .solicite p {
    font-size: 0.9rem;
  }

  .solicite-button {
    font-size: 1.2rem;
  }

}
</style>
