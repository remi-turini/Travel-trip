import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Connexion from '@/components/LoginAuth.vue'
import Inscription from '@/components/RegisterAuth.vue'
import MyTrip from '@/components/MyTrip.vue'
import Profile from '@/components/ProfilePage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/connexion',
        name: 'Connexion',
        component: Connexion
    },
    {
        path: '/inscription',
        name: 'Inscription',
        component: Inscription
    },
    {
        path: '/mes-voyages/:name',
        name: 'MesVoyages',
        component: MyTrip,
        props:true
    },
    {
        path: '/profil',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/"
    },
]

const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach((to, from, next) => {
   const bearer = localStorage.getItem("bearer");
    if ((to.path == "/connexion" || to.path == "/inscription") && bearer !== null) {
        next("/");
      } else if ((to.path == "/mes-voyages" || to.path == "/profil" || to.path == "/mon-voyage") && bearer == null){
        next("/");
      } else {
        next();
      }

});

  
export default router