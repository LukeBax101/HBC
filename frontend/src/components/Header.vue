<template>
  <transition name="slide-down" mode="out-in" appear>
    <div class="header">
      <button v-if="leftIcon" class="button left" v-on:click="leftClicked">
        <b-icon :scale="leftScale" :icon="leftIcon"></b-icon>
      </button>
      <h3 class="title">{{ title }}</h3>
      <button v-if="rightIcon" class="button right" v-on:click="rightClicked">
        <b-icon :scale="rightScale" :icon="rightIcon"></b-icon>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    leftIcon: String,
    leftScale: String,
    rightIcon: String,
    rightScale: String,
  },
  methods: {
    leftClicked() {
      this.$emit('left-clicked');
    },
    rightClicked() {
      this.$emit('right-clicked');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  padding-top: 5px;
  background: rgba(232,113,33,0.7);
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 10px 1px rgba(180,180,180, 0.4);
  border: none;
}

h3 {
  margin: 0;
}

.button {
  position: absolute;
  width: 40px;
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(230,230,230);
  text-align: center;
  vertical-align: middle;
  user-select: none;
}

.left {
  left: 55px;
}

.right {
  right: 60px;
}

.title {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 50px;
  font-weight: 600;
  font-style: italic;
  font-size: 0.98rem;
  color: rgba(230,230,230);
  align-self: center;
  letter-spacing: 0.08em;
}

.slide-down-enter-active {
  transition: all .8s ease;
}
.slide-down-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-down-enter, .slide-down-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-50px);
}
</style>
