<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="not-found">
    <h1>Page not found</h1>
    <router-link to="/">Go to home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 20px;
}
h1 {
  color: transparent;
  -webkit-text-stroke: 2px #f5ebeb;
  font-size: 4rem;
  line-height: 120%;
}
a {
  color: #f5ebeb;
}

a :visited {
  color: #f5ebeb;
}
</style>
