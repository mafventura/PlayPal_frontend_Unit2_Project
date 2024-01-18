<script setup>
    import { ref, onMounted } from 'vue';
    import { useCookies } from 'vue3-cookies'
    import { decodeCredential, googleLogout } from 'vue3-google-login'

    const { cookies } = useCookies()

    let isLoggedIn = ref(false)
    let userName = ''

    onMounted(checkSession)

    async function callback(response) {
        try {
            isLoggedIn.value = true

            const user = decodeCredential(response.credential)
            userName = user.given_name
            cookies.set('user_session', response.credential)

            await fetch(`${import.meta.env.VITE_API_URL}/users/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: user.email
                })
            })
            window.location.reload()
            console.log('session saved');
        } catch (error) {
            console.error('Error saving session:', error)
        }
    }

    function checkSession() {
        if (cookies.isKey('user_session')) {
            isLoggedIn.value = true
            const user = decodeCredential(cookies.get('user_session'))
            userName = user.given_name
        }
    }

    function handleLogout() {
        googleLogout()
        cookies.remove('user_session')
        isLoggedIn.value = false
        window.location.reload()
    }
</script>

<template>
    <body class="bg-dark text-white text-center">
        <div v-if="isLoggedIn">
            <h4>Hello {{  userName }}</h4>
            <button @click="handleLogout">Log Out</button>
        </div>
        <div v-else>
            <GoogleLogin :callback="callback" />
        </div>
    </body>
</template>
