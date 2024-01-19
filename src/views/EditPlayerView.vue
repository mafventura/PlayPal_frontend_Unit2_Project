EDIT PLAYER VIEW

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    const playerId = route.params.id

    const player = ref({
        playerName: '',
        playerImg: ''
    })

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/players/${playerId}`)
        .then(response => response.json())
        .then(result => {
            player.value = {
                playerName: result.playerName,
                playerImg: result.playerImg
            }
        })
        .catch(err => console.error(err))
    })

    function updatePlayer() {
        fetch(`${import.meta.env.VITE_API_URL}/players/edit/${playerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(player.value)
        })
        .then(() => {
            router.replace({ name: 'players'})
        })
        .catch(err => console.error(err))
    }

</script>

<template>
    <body class="bg-dark text-white text-center">
        <h1 class="p-5">Edit Player</h1>

        <div class="container d-flex flex-column align-items-center">
            <div class="input-group input-group-sm mb-3 " style="width: 400px;">
                <span class="input-group-text" id="inputGroup-sizing-sm" for="name">Player Name:</span>
                <input class="form-control" type="text" name="name" placeholder="Name" v-model="player.playerName">
            </div>
            <div class="input-group input-group-sm mb-3 " style="width: 400px;">
                <span class="input-group-text" id="inputGroup-sizing-sm" for="name">Picture URL:</span>
                <input class="form-control" type="text" name="cover" placeholder="https" v-model="player.playerImg">
            </div>
            <button @click="updatePlayer" class="btn btn-warning">Save Edit</button>
        </div>
    </body>
</template>

