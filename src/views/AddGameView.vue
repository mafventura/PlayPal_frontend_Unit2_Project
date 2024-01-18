<script setup>
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'
import { useRouter } from 'vue-router';

const router = useRouter()

const { cookies } = useCookies()
const user = decodeCredential(cookies.get('user_session'))

const game = ref({
    gameName: '',
    cover: '',
    user: user.email
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
                cover: '',
                user: user.email
            }
        }

        router.replace({ name: 'games'})

    } catch (error) {
        console.error('Error fetching data:', error)
    }
        
    } 


</script>

<template>
    <body class="bg-dark text-white text-center">
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
    </body>
</template>
