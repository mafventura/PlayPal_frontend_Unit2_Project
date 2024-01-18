<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    

    const player = ref({})

    onMounted(() => {
        const route = useRoute()

        fetch(`${import.meta.env.VITE_API_URL}/players/${route.params.id}`)
        .then(response => response.json())
        .then(result => {
            player.value = result
        })
        .catch(err => console.error(err))
    })
</script>

<template>
    <body>
        <h1>Single Player</h1>
        <h4>{{ player.playerName }}</h4>
    </body>
</template>
