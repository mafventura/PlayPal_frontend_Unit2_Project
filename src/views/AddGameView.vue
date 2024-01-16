<script setup>


    function searchGame() {
        
    }
</script>

<template>
    <main>
        <h1>Add Game</h1>

        <div class="gameForm">
            <label for="name">Name: </label>
            <input type="text" name="name" placeholder="Name" v-model="game.name">
            <button @click="searchGame">Search</button>
        </div>
    </main>
</template>
