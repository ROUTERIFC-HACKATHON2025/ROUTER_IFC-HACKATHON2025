<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/passageiros">Passageiros</RouterLink>
        <RouterLink to="/motorista">Motoristas</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0.5rem 1rem;
  border-left: none;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 180px;
    min-height: 100vh;
    padding: 1rem;
    background-color: #f0f0f0;
    border-right: 1px solid #ccc;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    text-align: left;
    margin-left: 0;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
    align-items: flex-start;
  }
}
</style>