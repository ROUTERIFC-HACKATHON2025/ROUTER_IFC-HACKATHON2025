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
    <section class="empresas animate-on-scroll">
      <h1 :style="{ borderColor: themeManager.detalhe }">
        <span :style="{ color: themeManager.detalheAlternativo }">INDY</span>TOUR
      </h1>
      <div class="descricao animate-on-scroll" :style="{ borderColor: themeManager.detalhe }">
        <p>
          A IndyTour, criada em 2020, é uma empresa de transporte por vans que atende os estudantes do Instituto Federal Catarinense - Campus Araquari (IFC) com segurança, pontualidade e conforto. Fundada por motoristas experientes, surgiu para facilitar o acesso à escola, principalmente para alunos que moram longe. Com veículos bem cuidados, rotas organizadas e motoristas capacitados, a IndyTour se tornou uma parceira importante na rotina escolar, ajudando os estudantes a chegarem ao campus com tranquilidade todos os dias.
        </p>
        <img src="/public/src-empresa/Logoindytour.png" alt="Ilustração empresa" :style="{ borderColor: themeManager.text }" />
      </div>
    </section>

    <section class="preco animate-on-scroll">
      <img src="/public/src-empresa/onibusIndy.png" alt="Ônibus IndyTour" class="animate-on-scroll">
      <div class="info animate-on-scroll" :style="{ borderColor: themeManager.text }">
        <p><strong>Mensalidade:</strong> <span :style="{ color: themeManager.detalheAlternativo }">11x de</span> R$ 600,00 <span :style="{ color: themeManager.detalheAlternativo }">ou 12x de</span> R$ 550,00</p>
        <p><strong>Endereço:</strong> R. Faustino Busarello, 520 - Boehmerwald, Joinville - SC, 89235-330</p>
        <p><strong>Telefone:</strong> (47) 99221-4606</p>
        <p><strong>Redes Sociais:</strong> <span :style="{ color: themeManager.detalheAlternativo }"><span class="mdi mdi-instagram"></span><a href="https://www.instagram.com/indy_tour" target="_blank" :style="{ color: themeManager.detalheAlternativo }">@indy_tour</a></span></p>
      </div>
    </section>
  </main>
  <main class="celular" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="empresas animate-on-scroll">
      <h1 :style="{ borderColor: themeManager.detalhe }"><span :style="{color: themeManager.detalheAlternativo}">INDY</span>TOUR</h1>
      <div class="descricao" :style="{ borderColor: themeManager.detalhe }">
        <img src="/public/src-empresa/Logoindytour.png" alt="Ilustração empresa" :style="{ borderColor: themeManager.text }" />
        <p>
          A IndyTour, criada em 2020, é uma empresa de transporte por vans que atende os estudantes do Instituto Federal Catarinense - Campus Araquari (IFC)com segurança, pontualidade e conforto. Fundada por motoristas experientes, surgiu para facilitar o acesso à escola, principalmente para alunos que moram longe. Com veículos bem cuidados, rotas organizadas e motoristas capacitados, a IndyTour se tornou uma parceira importante na rotina escolar, ajudando os estudantes a chegarem ao campus com tranquilidade todos os dias.
        </p>
      </div>
    </section>
    <section class="preco animate-on-scroll">
      <img src="/public/src-empresa/onibusIndy.png" alt="">
      <div class="info" :style="{ borderColor: themeManager.text }">
        <p><strong>Mensalidade:</strong> <span :style="{ color: themeManager.detalheAlternativo }">11x de</span> R$ 600,00 <span :style="{ color: themeManager.detalheAlternativo }">ou 12x de</span> R$ 550,00</p>
        <p><strong>Endereço:</strong> R. Faustino Busarello, 520 - Boehmerwald, Joinville - SC, 89235-330</p>
        <p><strong>Telefone:</strong> (47) 99221-4606</p>
        <p><strong>Redes Sociais:</strong> <span :style="{ color: themeManager.detalheAlternativo }"><span class="mdi mdi-instagram"></span> <a href="https://www.instagram.com/indy_tour" target="_blank" :style="{ color: themeManager.detalheAlternativo }">@indy_tour</a></span></p>
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

.notebook {
  padding: 190px 120px 80px 120px;
}

h1,
h2 {
  text-align: center;
  margin-bottom: 60px;
}

h1 {
  border-bottom: 2px solid;
  padding-bottom: 60px;
}

.empresas .descricao {
  padding: 0 50px 100px 50px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 2px solid;
}

.empresas p {
  max-width: 600px;
}

.empresas img {
  width: 400px;
  height: 400px;
  border-radius: 100%;
  border: 2px solid;
}

.preco {
  display: flex;
  justify-content: space-between;
  padding: 0 50px 0px 50px;
}

.info {
  margin-left: 5%;
  border-left: 2px solid;
  padding: 0px 0 20px 5%;
}

.info p {
  margin: 10px 0;
  font-size: 1.2rem;
}

.info p strong {
  font-weight: bold;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .celular {
    padding: 230px 0 50px 0;
  }

  h1,
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  h1 {
    border-bottom: 2px solid;
    padding-bottom: 20px;
    margin: 0 40px 30px 40px;
  }

  .empresas .descricao {
    padding: 0 15px 0px 15px;
    margin-bottom: 50px;
    display: block;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-bottom: none;
    text-align: center;
  }

  .empresas p {
    max-width: 600px;
    text-align: justify;
  }

  .empresas img {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}


.preco {
  display: block;
  justify-content: space-between;
  padding: 0 20px 0px 20px;
  text-align: center;

}

.preco img{
  width: 350px;
  height: auto;
}

.info {
  text-align: left;
  border-left: 2px none;
  padding: 0px;
  margin-left: 0;
}

.info p {
  margin: 10px 0;
  font-size: 0.9rem;
}

.info p strong {
  font-weight: bold;
  text-decoration: underline;
}
}
</style>
