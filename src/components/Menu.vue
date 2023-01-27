<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <div class="menu">
    <ul class="navbar-big">
      <li>
        <router-link to="/" exact-active-class="active">Home</router-link>
      </li>
      <li>
        <router-link to="/agents" active-class="active">Agents</router-link>
      </li>
      <li><router-link to="/maps" active-class="active">Maps</router-link></li>
      <li>
        <router-link to="weapons" active-class="active">Weapons</router-link>
      </li>
      <li>
        <router-link to="/tiers" active-class="active">Tiers</router-link>
      </li>
      <li>
        <router-link to="/peripherals" active-class="active"
          >Peripherals</router-link
        >
      </li>
    </ul>

    <div class="behind-hamburger">
      <button @click="menuOpen = !menuOpen" class="hamburger"></button>
    </div>
    <ul class="navbar-small" :class="[menuOpen ? '' : 'closed']">
      <li class="li-small">
        <router-link to="/" exact-active-class="active" @click="closeMenu"
          >Home</router-link
        >
      </li>
      <li class="li-small">
        <router-link to="/agents" active-class="active" @click="closeMenu"
          >Agents</router-link
        >
      </li>
      <li class="li-small">
        <router-link to="/maps" active-class="active" @click="closeMenu"
          >Maps</router-link
        >
      </li>
      <li class="li-small">
        <router-link to="weapons" active-class="active" @click="closeMenu"
          >Weapons</router-link
        >
      </li>
      <li class="li-small">
        <router-link to="/tiers" active-class="active" @click="closeMenu"
          >Tiers</router-link
        >
      </li>
      <li class="li-small">
        <router-link to="/peripherals" active-class="active" @click="closeMenu"
          >Peripherals</router-link
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
.navbar-big {
  list-style-type: none;
  padding: 20px 40px;
  margin: 0;
  display: flex;
  background-color: #1f1f1f;
}

a {
  text-decoration: none;
  color: #f5ebeb;
  margin-right: 20px;
  padding: 0 10px 4px 0;
}

a :visited {
  color: #f5ebeb;
}

.active {
  background-image: url("/active_link.png");
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: bottom right;
}

.navbar-small,
.hamburger {
  display: none;
}

@media screen and (max-width: 699px) {
  .navbar-big {
    display: none;
  }

  .hamburger {
    display: block;
    height: 30px;
    width: 30px;
    margin: 5px 10px;
    background-color: transparent;
    border: none;
    background-image: url("/hamburger.png");
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 99;
  }

  .behind-hamburger {
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 80;
    background-color: #1f1f1f;
  }

  .navbar-small {
    list-style-type: none;
    padding: 20px 40px;
    margin: 0;
    display: flex;
    background-color: #1f1f1f;
    flex-direction: column;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 2;
  }

  .li-small {
    padding: 10px 0 20px 0;
  }

  .closed {
    display: none;
  }
}
</style>
