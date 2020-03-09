<template>
  <div class="settings">
    <div id="nav">
      <router-link to="/sessions">Back</router-link> |
      <router-link to="/live">Live</router-link>
      <router-link to="/score">Score</router-link>
    </div>
    <HelloWorld msg="Welcome to the settings page!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Settings',
  components: {
    HelloWorld,
  },
};
</script>
