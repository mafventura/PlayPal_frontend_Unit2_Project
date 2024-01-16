<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>

<div class="wrapper">
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/library">Library</RouterLink>
    <RouterLink to="/players">Players</RouterLink>
  </nav>
</div>
</header>

  <RouterView />
</template>
