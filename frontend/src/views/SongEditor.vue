<template>
  <div class="song-editor">
    <Header
     title="Song Viewer"
     leftIcon="arrow-left"
     leftScale="1.7"
     right-icon="pencil"
     rightScale="1.5"
     v-on:left-clicked="goToSongs"
     v-on:right-clicked="editSong"
    ></Header>
    <p>{{ activeSongId }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Header.vue';

export default {
  name: 'SongEditor',
  components: {
    Header,
  },
  computed: {
    ...mapGetters([
      'activeSongId',
    ]),
  },
  methods: {
    goToSongs() {
      this.$router.push('/songs');
    },
    editSong() {
      console.log('edit song');
    },
  },
};
</script>
