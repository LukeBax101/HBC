<template>
  <div class="live">
    <div id="nav">
      <router-link to="/sessions">Back</router-link> |
      <router-link to="/score">Score</router-link>
      <router-link to="/settings">Settings</router-link>
    </div>
    <HelloWorld msg="Welcome to the live page!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Sessions',
  components: {
    HelloWorld,
  },
};
</script>
