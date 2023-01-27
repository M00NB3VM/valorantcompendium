<script setup>
import { ref } from "vue";
import Menu from "./components/Menu.vue";
import LoadingScreen from "./pages/LoadingScreen.vue";
import Footer from "./components/Footer.vue";

const homeScreen = ref(true);
if (window.location.pathname !== "/") {
  homeScreen.value = false;
}
</script>

<template>
  <div v-if="homeScreen">
    <LoadingScreen />

    <div class="site-content">
      <Menu />

      <router-view v-slot="{ Component }">
        <div class="filler"></div>
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
      <Footer />
    </div>
  </div>

  <div v-else>
    <Menu />

    <router-view v-slot="{ Component }">
      <div class="filler"></div>
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<style scoped>
.filler {
  height: 64px;
  width: 100%;
  z-index: -1;
  background-color: #1f1f1f;
}
.site-content {
  animation: fade-in 4s linear 1;
  -webkit-animation: fade-in 4s;
  -moz-animation: fade-in 4s;
  -o-animation: fade-in 4s;
  -ms-animation: fade-in 4s;
  animation-delay: 1s;
}

.hide-scroll {
  animation: hide-scroll 5s linear;
}

@keyframes fade-in {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes hide-scroll {
  from,
  to {
    overflow: hidden;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

@media screen and (max-width: 699px) {
  .filler {
    height: 40px;
  }
}
</style>
