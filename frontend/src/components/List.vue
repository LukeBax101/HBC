<template>
  <div class="list">
    <transition-group
      name="slide"
      appear
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <b-button
        block
        v-for="(item, idx) in Object.values(items)"
        variant="outline-dark"
        v-on:click="() => {itemClicked(item)}"
        v-bind:key="idx"
        v-bind:data-index="idx"
      >
        <b-icon class="icon-a" :icon="iconA()"></b-icon>
        <span>
          {{ item.name }}
        </span>
        <div class="icon-b">
          {{ uses && uses(item) }}
          <b-icon :icon="iconB(item)"></b-icon>
        </div>
      </b-button>
    </transition-group>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';

export default {
  name: 'List',
  props: {
    items: Object,
    iconA: Function,
    iconB: Function,
    uses: Function,
  },
  methods: {
    itemClicked(item) {
      this.$emit('item-clicked', item);
    },
    beforeEnter(el) {
      const element = el;
      element.style.transform = 'translateX(100%)';
    },
    enter(el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(
          el,
          { translateX: [0, 500] },
          { complete: done },
        );
      }, delay);
    },
    leave(el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(
          el,
          { translateX: [-500, 0] },
          { complete: done },
        );
      }, delay);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list {
  width: 100%;
  position:relative;
  overflow-y:auto;
  overflow-x:hidden;
  height: calc(100% - 50px);
}

.btn-block {
  height: 60px;
  border: none;
  box-shadow: 4px 2px 10px 6px rgba(180,180,180,0.4);
  font-weight: bold;
}

.btn-block:last-child {
  margin-bottom: 80px;
}

.btn-block:first-child {
  margin-top: 10px;
}

.icon-a {
  position: absolute;
  left: 10px;
}

.icon-b {
  display: inline-block;
  position: absolute;
  right: 10px;
}

</style>
