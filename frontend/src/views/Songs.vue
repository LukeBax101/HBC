<template>
  <div class="songs">
    <b-overlay
      :show="loading"
      spinner-type="grow"
      rounded="sm"
      class="overlay"
    >
      <Header
        title="Songs"
        leftIcon="arrow-left"
        leftScale="1.7"
        v-on:left-clicked="goToHome"
      ></Header>
      <div class="songs-list">
        <List
          v-if="songs"
          :items="songs"
          :iconA="musicNote"
          :iconB="usesIcon"
          :uses="songUses"
          v-on:item-clicked="songClicked"
        >
        </List>
      </div>
      <FloatButton
        icon="plus"
        v-on:float-button-clicked="addNewSong"
      >
      </FloatButton>
      <NavBar
        :icons="navBarIcons"
        :selected="1"
        v-on:nav-bar-clicked="navBarClicked"
      ></NavBar>
    </b-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header.vue';
import NavBar from '@/components/NavBar.vue';
import FloatButton from '@/components/FloatButton.vue';
import List from '@/components/List.vue';

export default {
  name: 'Songs',
  components: {
    Header,
    NavBar,
    List,
    FloatButton,
  },
  data() {
    return {
      loading: false,
      periodicCheck: 0,
      navBarIcons: ['list-task', 'music-note-list'],
    };
  },
  computed: {
    ...mapGetters([
      'songs',
      'activeSongId',
    ]),
  },
  async mounted() {
    this.load();
    this.setActiveSongId(null);
    this.periodicCheck = setInterval(this.getAllSongs, 60000);
  },
  destroyed() {
    clearInterval(this.periodicCheck);
  },
  methods: {
    ...mapActions([
      'getAllSongs',
      'setActiveSongId',
      'addSong',
    ]),
    musicNote() {
      return 'music-note-beamed';
    },
    usesIcon() {
      return 'heart';
    },
    songUses(song) {
      return song.session_count;
    },
    songClicked(song) {
      this.setActiveSongId(song.song_id);
      this.$router.push('/song-editor');
    },
    goToHome() {
      this.$router.push('/');
    },
    navBarClicked(idx) {
      if (idx === 0) {
        this.$router.push('/sessions');
      }
    },
    addNewSong() {
      this.addSong();
    },
    async load() {
      this.loading = true;
      await this.getAllSongs();
      this.loading = false;
    },
  },
};
</script>

<style>
.songs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.songs-list {
  height: calc(100% - 60px);
}

.overlay{
  width: 100%;
  height: 100%;
  color: #e87121;
}
</style>
