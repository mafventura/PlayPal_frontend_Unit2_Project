import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesView from '@/views/GamesView.vue'
import SingleGameView from '@/views/SingleGameView.vue'
import PlayersView from '@/views/PlayersView.vue'
import AddPlayerView from '@/views/AddPlayerView.vue'
import AddGameView from '@/views/AddGameView.vue'
import LoginView from '@/components/LoginView.vue'
import AddLogView from '@/views/AddLogView.vue'
import EditPlayerView from '@/views/EditPlayerView.vue'

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
      path: '/games/:id',
      name: 'singlegame',
      component: SingleGameView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersView
    },
    {
      path: '/players/edit/:id',
      name: 'editplayer',
      component: EditPlayerView
    },
    {
      path: '/players/add',
      name: 'singleplayer',
      component: AddPlayerView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/log/add/:id',
      name: 'addlog',
      component: AddLogView
    },
    
  ]
})

export default router
