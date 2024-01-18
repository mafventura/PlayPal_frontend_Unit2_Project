<script setup>
import { ref, onMounted } from 'vue';
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'
import { useRouter } from 'vue-router';

const router = useRouter()

const { cookies } = useCookies()
// const user = decodeCredential(cookies.get('user_session'))

const userEmail = ref()

const player = ref({
    playerName: '',
    playerImg: '',
    // user: user.email
})

async function addPlayer() {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/players/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': userEmail.value
            },
            body: JSON.stringify(player.value)
        })

        if (response) {
            player.value = {
                playerName: '',
                playerImg: '',
                // user: user.email
            }
        }

        router.replace({ name: 'players'})

    } catch (error) {
        console.error('Error fetching data:', error)
    }
        
    } 

    function checkSession() {
        if (cookies.isKey('user_session')) {
            const user = decodeCredential(cookies.get('user_session'))
            userEmail.value = user.email
        }
    }

    onMounted(checkSession)

</script>

<template>
    <body class="bg-dark text-white text-center">
        <h1 class="p-5">Add New Player</h1>

        <div class="container d-flex flex-column align-items-center">
            <div class="input-group input-group-sm mb-3 " style="width: 400px;">
                <span class="input-group-text" id="inputGroup-sizing-sm" for="name">Player Name:</span>
                <input class="form-control" type="text" name="name" placeholder="Name" v-model="player.playerName">
            </div>
            <div class="input-group input-group-sm mb-3 " style="width: 400px;">
                <span class="input-group-text" id="inputGroup-sizing-sm" for="name">Picture URL:</span>
                <input class="form-control" type="text" name="cover" placeholder="https" v-model="player.playerImg">
            </div>
            <button @click="addPlayer" class="btn btn-warning">Add Player</button>
        </div>
    </body>
</template>
