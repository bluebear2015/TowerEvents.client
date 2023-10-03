<template>
  <header>
    <Navbar />
  </header>
  <main class="hero-img">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.hero-img {

  background-image: url('https://images.unsplash.com/photo-1465533403411-0af6ede250dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

  background-repeat: repeat;
  object-fit: cover;

}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
