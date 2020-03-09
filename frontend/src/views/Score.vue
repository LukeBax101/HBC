<template>
  <div class="score">
    <div id="nav">
      <router-link to="/sessions">Back</router-link> |
      <router-link to="/live">Live</router-link>
      <router-link to="/settings">Settings</router-link>
    </div>
    <HelloWorld msg="Welcome to the score page!"/>
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Score',
  components: {
    HelloWorld,
  },
};
</script>
