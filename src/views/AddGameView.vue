<script setup>
import { ref } from 'vue';

const game = ref({
    gameName: '',
    cover: ''
})

async function addGame() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/games/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game.value)
        })

        if (response) {
            game.value = {
                gameName: '',
                cover: ''
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error)
    }
        
    } 


    



</script>

<template>
    <main class="bg-dark text-white text-center">
        <h1 class="p-5">Add New Game</h1>

        <div class="container d-flex flex-column align-items-center">
            <div class="input-group input-group-sm mb-3 " style="width: 400px;">
                <span class="input-group-text" id="inputGroup-sizing-sm" for="name">Game Name:</span>
                <input class="form-control" type="text" name="name" placeholder="Name" v-model="game.gameName">
            </div>
            <div class="input-group input-group-sm mb-3 " style="width: 400px;">
                <span class="input-group-text" id="inputGroup-sizing-sm" for="name">Cover URL:</span>
                <input class="form-control" type="text" name="cover" placeholder="https" v-model="game.cover">
            </div>
            <button @click="addGame" class="btn btn-warning">Add Game</button>
        </div>
    </main>
</template>
