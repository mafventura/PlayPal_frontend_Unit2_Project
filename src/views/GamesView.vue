<script setup>
import { onMounted, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()

const gamesBackEnd = ref([])
const userEmail = ref()

onMounted( () => {
    checkSession(),
    fetchData()
})

function checkSession() {
        if (cookies.isKey('user_session')) {
            const user = decodeCredential(cookies.get('user_session'))
            userEmail.value = user.email
        }
    }

async function fetchData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/games`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': userEmail.value
            }
        })
        const result = await response.json()
        gamesBackEnd.value = result
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}


async function deleteGame(gameId) {
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': userEmail.value
            }

        })
        alert('Game Deleted')
        fetchData()

    } catch (error) {
        console.error('Error deleting game:', error)
    }
}

</script>

<template>
    <body class="bg-dark text-white text-center">
        <h1 class="p-5">Games</h1>
            <div class="container d-flex flex-row flex-wrap justify-content-center align-items-center">
                <div v-for="game in gamesBackEnd" :key="game._id" class="card me-5 mb-5 bg-warning-subtle border-warning" style="width: 12rem;">
                    <div style="position: relative;">
                        <button @click="deleteGame(game._id)" type="button" class="btn-close m-1" style="position: absolute; top: 0; right: 0; z-index: 1;"></button>
                        <img :src="game.cover" alt="Game Cover" class="card-img-top" style="height: 200px; object-fit: cover;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ game.gameName }}</h5>
                        <router-link :to="'/games/' + game._id"><button class="btn btn-warning text-white">Logs</button></router-link>
                    </div>
                </div>
                <router-link to="/games/add" class="card me-5 bg-warning-subtle border-warning" style="width: 12rem; text-decoration: none;">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <button class="btn btn-warning text-white">Add New</button>
                    </div>
                </router-link>
            </div>
    </body>

</template>
