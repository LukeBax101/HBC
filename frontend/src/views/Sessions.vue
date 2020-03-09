<template>
  <div class="sessions">
    <div id="nav">
      <router-link to="/">Back</router-link> |
      <router-link to="/live">Live</router-link> |
      <router-link to="/score">Score</router-link>
      <router-link to="/settings">Settings</router-link>
    </div>
    <HelloWorld msg="Welcome to the sessions page!"/>
    <HelloWorld :msg='sessions.title' />
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
  data: () => ({
    sessions: { title: 'hello' },
  }),
};
</script>
