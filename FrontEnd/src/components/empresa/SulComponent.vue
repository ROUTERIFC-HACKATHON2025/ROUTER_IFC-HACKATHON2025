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
});
</script>

<template>
  <main class="pagina-empresas" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="empresas animate-on-scroll">
      <h1 :style="{ borderColor: themeManager.detalhe }">
        <span :style="{ color: themeManager.detalheAlternativo }">SUL </span>TURISMO
      </h1>
      <div class="descricao animate-on-scroll" :style="{ borderColor: themeManager.detalhe }">
        <p>
          A Sul Turismo, criada em 2015, atua no transporte de estudantes com foco em conforto, eficiência e atendimento de qualidade. Presente no dia a dia dos alunos do Instituto Federal Catarinense - Campus Araquari (IFC), a empresa organiza suas rotas de forma inteligente, buscando sempre facilitar a rotina escolar. Seu diferencial está no cuidado com cada passageiro e na confiança construída ao longo do tempo com famílias e instituições. A Sul Turismo não é apenas uma opção de transporte — é uma solução prática e segura para quem valoriza pontualidade e tranquilidade no trajeto até a escola.
        </p>
        <img src="/public/src-empresa/logosulTurismo.png" alt="Ilustração empresa" class="animate-on-scroll" />
      </div>
    </section>

    <section class="preco animate-on-scroll">
      <img src="/public/src-empresa/onibusSul.png" alt="Ônibus Sul Turismo" class="animate-on-scroll">
      <div class="info animate-on-scroll" :style="{ borderColor: themeManager.text }">
        <p><strong>Mensalidade:</strong> <span :style="{ color: themeManager.detalheAlternativo }">11x de</span> R$ 600,00 <span :style="{ color: themeManager.detalheAlternativo }">ou 12x de</span> R$ 550,00</p>
        <p><strong>Endereço:</strong><br>
R. Jonecir José Baierski, 26 - Santa Catarina, Joinville - SC, 89232-070<br>
R. Ezequiel Assis Rocha, 1379 - Centro, Araquari - SC, 89245-000</p>
        <p><strong>Telefone:</strong> (47) 99676-7651</p>
        <p><strong>Redes Sociais:</strong> <span :style="{ color: themeManager.detalheAlternativo }"><span class="mdi mdi-instagram"></span> @sulturismotransportes</span></p>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Animação de scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(.2, .65, .25, 1);
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Estilo da página */
.pagina-empresas {
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
  width: 350px;
  height: 350px;
}

.preco {
  display: flex;
  justify-content: space-between;
  padding: 0 50px 0px 50px;
}

.info {
  border-left: 2px solid;
  padding: 0px 0 20px 5%;
  margin-left: 5%;
}

.info p {
  margin: 2px 0;
  font-size: 1.2rem;
}

.info p strong {
  font-weight: bold;
  text-decoration: underline;
}
</style>
