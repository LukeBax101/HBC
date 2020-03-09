<template>
  <div class="home">
    <div id="nav">
      <router-link to="/sessions">Sessions</router-link> |
      <router-link to="/songs">Songs</router-link>
    </div>
    <HelloWorld msg="Welcome home!"/>
    <p>{{ counter }}</p>
    <button @click="decrementCounterAction()"> - </button>
    <button @click="incrementCounterAction()"> + </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  computed: mapGetters([
    'counter',
  ]),
  methods: mapActions([
    'decrementCounterAction',
    'incrementCounterAction',
  ]),
};
</script>
