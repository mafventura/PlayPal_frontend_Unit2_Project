<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { useCookies } from 'vue3-cookies'
  import { decodeCredential } from 'vue3-google-login'

    const { cookies } = useCookies()

    let isLoggedIn = ref(false)
    const userName = ref('')

    onMounted(checkSession)

    function checkSession() {
        if (cookies.isKey('user_session')) {
            isLoggedIn.value = true
            const user = decodeCredential(cookies.get('user_session'))
            userName.value = user.given_name
        }
    }

</script>

<template>
  <header>
    <div class="wrapper">
        <nav class="navbar bg-warning border-bottom border-body">
          <div class="container-fluid justify-content-start" v-if="isLoggedIn">
            <a class="navbar-brand" href="/"><img src="https://i.imgur.com/0HCduo5.png" style="height: 50px;"/></a>
            <RouterLink to="/games" class="nav-link text-white me-2">Games</RouterLink>
            <RouterLink to="/players" class="nav-link text-white ">Players</RouterLink>
            <img src="" alt="">
          </div>
          
        </nav>
    </div>
  </header>

  <RouterView />
</template>
