<template>
  <div class="song-editor">
    <div id="nav">
      <router-link to="/songs">Back</router-link> |
    </div>
    <HelloWorld msg="Welcome to the song editor page!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'SongEditor',
  components: {
    HelloWorld,
  },
};
</script>
