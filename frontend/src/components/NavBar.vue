<template>
  <transition name="slide-up" mode="out-in" appear>
    <div class="nav-bar">
      <button
        v-for="(icon, idx) in icons"
        class="nav-bar-button"
        v-on:click="() => clicked(idx)"
        v-bind:class="{ 'selected': idx === selected}"
        :key="idx"
      >
        <b-icon scale="1.2" :icon="icon"></b-icon>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Header',
  props: {
    icons: Array,
    selected: Number,
  },
  methods: {
    clicked(idx) {
      this.$emit('nav-bar-clicked', idx);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  position: absolute;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  bottom: 0;
  height: 50px;
  align-items: center;
  box-shadow: 0 -8px 10px 1px rgba(180,180,180, 0.4);
}

.nav-bar > .nav-bar-button:first-child {
  border: none;
}

.nav-bar-button {
  border-top: none;
  border-bottom: none;
  border-left: 5;
  border-right: none;
  border-color: rgba(230,230,230);
  background: white;
  color: rgba(180,180,180);
  flex-grow: 1;
  cursor: pointer;
  user-select: none;
}

.selected {
  color: #e87121;
}

.slide-up-enter-active {
  transition: all .8s ease;
}

.slide-up-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-up-enter, .slide-up-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(50px);
}
</style>
