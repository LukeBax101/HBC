<template>
  <div class="home">
    <button
      class="home-button sessions-button"
      v-bind:class="{'session': !loading}"
      v-on:click="goToSessions"
    >
      <b-icon scale="1.5" icon="list-task"></b-icon>
      <span>Sessions</span>
    </button>
    <div >
      <img
        class="logo"
        v-bind:class="{
          'pulsing': loading,
          'right': !loading,
          }"
        src="../assets/HBCLogoB.jpg"
      >
      <img
        class="text"
        v-bind:class="{'left': !loading}"
        src="../assets/HBCLogoA.jpg"
      >
    </div>
    <button
      class="home-button songs-button"
      v-bind:class="{'song': !loading}"
      v-on:click="goToSongs"
    >
      <b-icon icon="music-note-list"></b-icon>
      <span>Songs</span>
    </button>
    <b-spinner
      v-if="loading"
      class="spinner"
    ></b-spinner>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
    };
  },
  computed: mapGetters([
    'sessions',
    'songs',
  ]),
  mounted() {
    if (this.sessions && this.songs) {
      this.loading = false;
    } else {
      this.getAllSessions();
      this.getAllSongs();
      this.load();
    }
  },
  methods: {
    ...mapActions([
      'getAllSessions',
      'getAllSongs',
    ]),
    goToSessions() {
      this.$router.push('/sessions');
    },
    goToSongs() {
      this.$router.push('/songs');
    },
    load() {
      setTimeout(() => {
        if (this.sessions && this.songs) {
          this.loading = false;
        } else {
          this.load();
        }
      }, 2500);
    },
  },
};
</script>

<style>
.spinner {
  position: absolute;
  bottom: 10px;
  margin-right: auto;
  margin-left: auto;
  left: 0;
  right: 0;
  color: rgba(232,113,33,0.7);
}

.home {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.logo{
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 8px 8px 10px 8px rgba(180,180,180,0.6);
  border-radius: 6px;
  z-index: 999;
}

.songs-button {
  border-top-right-radius: 50rem;
  border-bottom-right-radius: 50rem;
  bottom: 50px;
  left: -300px;
}

.home-button {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 50px;
  font-weight: 600;
  font-style: italic;
  font-size: 1.2rem;
  position: absolute;
  height: 80px;
  width: 200px;
  background-color: rgba(232,113,33,0.7);
  box-shadow: 8px 8px 10px 8px rgba(180,180,180,0.6);
  border: none;
  display: inline-block;
  color: rgb(104, 93, 88);
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  padding: 0.375rem 0.75rem;
}

.home-button > span {
  padding-left: 10px;
}

.sessions-button {
  border-top-left-radius: 50rem;
  border-bottom-left-radius: 50rem;
  top: 50px;
  right: -300px;
}

.text{
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 6px;
  z-index: 998;
}

.pulsing {
  animation: pulse 2.5s infinite;
  animation-name: pulse;
}

.left {
  animation: left 1s;
  animation-name: left;
  transform: translateX(-50px);
}

.session {
  animation: session 2s;
  animation-name: session;
  transform: translateX(-300px);
}

.song {
  animation: song 2s;
  animation-name: song;
  transform: translateX(300px);
}

.right {
  animation: right 1s;
  animation-name: right;
  transform: translateX(50px);
}


@keyframes session {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-300px);
  }
}

@keyframes song {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(300px);
  }
}

@keyframes left {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-50px);
  }
}

@keyframes right {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(50px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  45% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.3);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
