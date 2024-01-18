<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useCookies } from 'vue3-cookies'
    import { decodeCredential } from 'vue3-google-login'

    const { cookies } = useCookies()

    const router = useRouter()
    const route = useRoute()
    const userEmail = ref()

    const log = ref({
        gameId: route.params.id,
        durationHours: '',
        durationMinutes: '',
        scores: []
    })

    const players = ref({})
    const gameId = route.params.id
    const selectedPlayer = ref('')
    const selectedScore = ref('')


    onMounted(() => {
        checkSession(),
        fetchPlayers()
    })

    function checkSession() {
        if (cookies.isKey('user_session')) {
            const user = decodeCredential(cookies.get('user_session'))
            userEmail.value = user.email
        }
    }

    function fetchPlayers() {

            fetch(`${import.meta.env.VITE_API_URL}/players`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': userEmail.value
            }})
            .then(response => response.json())
            .then(result => {
                players.value = result
                console.log(result);
            })
            .catch(err => console.error(err))
    }


    async function addLog() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/log/add/${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Email': userEmail.value
                },
                body: JSON.stringify(log.value)
            })

            if (response) {
                log.value = {
                    gameId: route.params.id,
                    durationHours: '',
                    durationMinutes: '',
                    scores: []
                }
            }

            router.push(`/games/${gameId}`)

        } catch (error) {
            console.error('Error fetching data:', error)
        }
            
        } 

    function addPlayerScore() {
        if(selectedPlayer.value && selectedScore.value !== '') {
            console.log(selectedPlayer.value);
            log.value.scores.push({
                playerName: selectedPlayer.value,
                score: selectedScore.value
            })

            selectedPlayer.value = ''
            selectedScore.value = ''
        }
    }

</script>

<template>
<body class="bg-dark text-white text-center">
    <h1 class="p-5">Add New Log</h1>

    <div class="container d-flex flex-column align-items-center">
        <div class="input-group input-group-sm mb-3 d-flex flex-column" style="width: 400px;">
            <div class="input-group input-group-sm mt-3">
                <span class="input-group-text" for="durationHours">Hours:</span>
                <input type="number" class="form-control" id="durationHours" placeholder="Hours" v-model="log.durationHours">
                <span class="input-group-text" for="durationMinutes">Minutes:</span>
                <input type="number" class="form-control" id="durationMinutes" placeholder="Minutes" v-model="log.durationMinutes">
            </div>
            <div class="input-group input-group-sm mt-3">
                <label class="input-group-text" for="player">Player:</label>
                <select v-model="selectedPlayer" class="form-select form-control">
                <option disabled value="">Select a player</option>
                <option v-for="player in players" :key="player._id" :value="player.playerName">{{ player.playerName }}</option>
            </select>
            </div>
            
            <div class="input-group input-group-sm mt-3 " style="width: 400px;">
                <span class="input-group-text" for="score">Score:</span>
                <input type="number" class="form-control" id="score" placeholder="Enter score" v-model="selectedScore">
            </div>
            <button @click="addPlayerScore" class="btn btn-success mt-3">Add Player Score</button>
        </div>

        <ul>
            <li v-for="(score, index) in log.scores" :key="index">
                Player: {{ score.playerName }}, Score: {{ score.score }}
            </li>
        </ul>

        <button @click="addLog" class="btn btn-warning">Add Log</button>
    </div>
</body>
</template>
