<script setup>
const gamesBackEnd = ([])


</script>

<template>
    <main>
        <h1>Library</h1>
        <ul>
            <li v-for="game in gamesBackEnd" :key="game._id">
                {{ game.name }}
            </li>
            <li><RouterLink :to="'/library/add' ">Add Game</RouterLink></li>
        </ul>
    </main>
</template>
