<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="router" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didLogout;
    },
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  watch: {
    didAutoLogout(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

li {
  list-style: none;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.router-enter-active {
  transition: all 0.25s ease-out;
}

.router-leave-active {
  transition: all 0.25s ease-in;
}

.router-leave-to {
  opacity: 1;
  transform: translateY(30px);
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>