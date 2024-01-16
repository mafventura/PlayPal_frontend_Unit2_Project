<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
        <nav class="navbar bg-warning border-bottom border-body">
          <div class="container-fluid justify-content-start">
            <a class="navbar-brand" href="/"><img src="https://i.imgur.com/0HCduo5.png" style="height: 50px;"/></a>
            <RouterLink to="/games" class="nav-link text-white me-2">Games</RouterLink>
            <RouterLink to="/players" class="nav-link text-white ">Players</RouterLink>
          </div>
          
        </nav>
    </div>
  </header>

  <RouterView />
</template>
