<template>
  <transition name="slide-in" mode="out-in" appear>
    <button
      class="float-button"
      v-on:click="() => clicked()"
    >
      <b-icon scale="2" :icon="icon"></b-icon>
    </button>
</transition>
</template>

<script>
export default {
  name: 'FloatButton',
  props: {
    icon: String,
  },
  methods: {
    clicked() {
      this.$emit('float-button-clicked');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.float-button {
  position: absolute;
  border: none;
  right: 20px;
  bottom: 70px;
  width: 55px;
  height: 55px;
  box-shadow: 0px 0px 6px, 8px;
  border-radius: 50%;
  background: rgba(232,113,33,0.8);
  color: white;
}

.slide-in-enter-active {
  transition: all .5s ease;
}
.slide-in-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-in-enter, .slide-in-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
}
</style>
