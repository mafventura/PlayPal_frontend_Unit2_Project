import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesView from '@/views/GamesView.vue'
import SingleGameView from '@/views/SingleGameView.vue'
import PlayersView from '@/views/PlayersView.vue'
import SinglePlayerView from '@/views/SinglePlayerView.vue'
import AddGameView from '@/views/AddGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView
    },
    {
      path: '/games/add',
      name: 'addgame',
      component: AddGameView
    },
    {
      path: '/games/:game_id',
      name: 'singlegame',
      component: SingleGameView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersView
    },
    {
      path: '/players/:id',
      name: 'singleplayer',
      component: SinglePlayerView
    },
    
  ]
})

export default router
