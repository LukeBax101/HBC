<template>
  <div class="songs">
    <div id="nav">
      <router-link to="/">Back</router-link> |
      <router-link to="/song-editor">Song Editor</router-link>
    </div>
    <HelloWorld msg="Welcome to the songs page!"/>
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Songs',
  components: {
    HelloWorld,
  },
};
</script>
