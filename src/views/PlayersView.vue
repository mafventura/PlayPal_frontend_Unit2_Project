<script setup>
    import { ref, onMounted } from 'vue'
    // import { RouterLink } from 'vue-router'

    const playersBackEnd = ref([])

    onMounted( async () => {
    await fetchData()
})

async function fetchData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/players`)
        const result = await response.json()
        playersBackEnd.value = result
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
</script>

<template>
    <main class="bg-dark text-white text-center">
        <h1 class="p-5">Players</h1>
            <div class="container d-flex flex-row flex-wrap justify-content-center align-items-center">
                <div v-for="player in playersBackEnd" :key="player._id" class="card me-5 mb-5 bg-warning-subtle border-warning" style="width: 12rem;">
                    <img :src="player.playerImg" alt="Player Img" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">{{ player.playerName }}</h5>
                        <button class="btn btn-warning text-white">Logs</button>
                    </div>
                </div>
                <router-link to="/games/add" class="card me-5 bg-warning-subtle border-warning" style="width: 12rem; text-decoration: none;">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <button class="btn btn-warning text-white">Add New</button>
                    </div>
                </router-link>
            </div>
    </main>
</template>
