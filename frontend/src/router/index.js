import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sessions',
    name: 'Sessions',
    // route level code-splitting
    // this generates a separate chunk (sessions.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "sessions" */ '../views/Sessions.vue'),
  },
  {
    path: '/live',
    name: 'Live',
    // route level code-splitting
    // this generates a separate chunk (live.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "live" */ '../views/Live.vue'),
  },
  {
    path: '/score',
    name: 'Score',
    // route level code-splitting
    // this generates a separate chunk (score.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "score" */ '../views/Score.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (settings.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
  },
  {
    path: '/songs',
    name: 'Songs',
    // route level code-splitting
    // this generates a separate chunk (songs.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "songs" */ '../views/Songs.vue'),
  },
  {
    path: '/song-editor',
    name: 'SongEditor',
    // route level code-splitting
    // this generates a separate chunk (song-editor.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "song-editor" */ '../views/SongEditor.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
