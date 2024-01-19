<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    

    const game = ref({})
    const logs = ref([])

    onMounted(() => {
        const route = useRoute()

        fetch(`${import.meta.env.VITE_API_URL}/games/${route.params.id}`)
        .then(response => response.json())
        .then(result => {
            game.value = result
        })
        .catch(err => console.error(err))

        fetch(`${import.meta.env.VITE_API_URL}/logs`)
        .then(response1 => response1.json())
        .then(result1 => {
            logs.value = result1
            console.log(result1);
        })

    })
</script>

<template>
    <body class="bg-dark text-white">
        <div class="container d-flex flex-row">
            <img :src="game.cover" alt="" class="m-5">
            <div class="container d-flex flex-column align-items-start justify-content-center">
                <h1>{{ game.gameName }}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat adipisci commodi, voluptatum animi voluptate quis ducimus eveniet porro similique maxime explicabo quod reprehenderit est quam vitae doloribus illo neque ratione!</p>
            </div>
        </div>
        <hr>
        <div class="container">
            <h1>Logs for {{ game.gameName }}</h1>
            <router-link :to="'/log/add/' + game._id" class="bg-warning-subtle" style="width: 12rem; text-decoration: none;">
                <button class="btn btn-warning text-white">Add New</button>
            </router-link>
            <div class="container mt-3">
                <ul>
                    <li v-for="log in logs" :key="log.game" style="list-style-type: none;">
                        <div v-if="log.game === game._id">
                            <h5>Duration: {{ log.durationHours }}h{{ log.durationMinutes }}</h5>
                            <h5>Players: </h5>
                            <div v-for="score in log.scores" :key="score._id">
                                <h6>{{ score.player?.playerName }}: {{ score.score }}</h6>
                            </div>
                            <hr>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </body>
</template>
