<template>
  <div id="app">
    <transition name="slide">
      <b-alert class="alert" :variant="type" v-model="show"> {{ text }}</b-alert>
    </transition>
    <transition
        name="fade"
        mode="out-in"
      >
    <router-view class="router"/>
  </transition>

  </div>
</template>

<script>
import EventBus from './event-bus';

export default {
  name: 'App',
  data() {
    return {
      show: 0,
      text: '',
      type: '',
    };
  },
  mounted() {
    EventBus.$on('show-alert', (data) => {
      this.text = data.text;
      this.type = data.type || 'danger';
      this.show = data.duration || 2;
    });
  },
  destroyed() {
    EventBus.$off('show-alert');
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
.alert {
  position: absolute;
  width: 100%;
  top: 55px;
  z-index: 10000;
}

.router {
  top: 0px;
}


.slide-enter-active {
  animation: slide-in .3s;
}
.slide-leave-active {
  animation: slide-in .3s reverse;
}
@keyframes slide-in {
  0% {
    top: -110px;
  }
  100% {
   top : 55px;
  }
}
</style>
