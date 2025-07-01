<script setup>
</script>

<template>
    <header>
        <h1>
            <img src="" alt="Imagem da logo" />
        </h1>
        <nav>
            <input type="text" placeholder="Pesquisar..." />
            <ul>
                <li><router-link to="">Página</router-link></li>
                <li><router-link to="">Página</router-link></li>
                <li><router-link to="">Página</router-link></li>
                <li><router-link to="">Página</router-link></li>
                <li><router-link to="">Página</router-link></li>
            </ul>
        </nav>
        <button><router-link to="/">Sign in</router-link></button>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #575757;
}
header h1{
    height: 50px;
    color: #ffffff;
}
header nav {
    display: flex;
    align-items: center;
}
header nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
}
header nav ul li {
    display: inline;
    text-decoration: none;
}
header nav ul li a {
    text-decoration: none;
    color: inherit;
    color: #ffffff;

}
header button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
header button a {
    color: white;
    text-decoration: none;
}
header button:hover {
    background-color: #0056b3;
}
</style>