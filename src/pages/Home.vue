<script setup>
import { ref } from "vue";
</script>

<template>
  <div>
    <ul class="home-ul">
      <li class="home-li agents">
        <router-link to="/agents">AGENTS</router-link>
      </li>
      <li class="home-li maps"><router-link to="/maps">MAPS</router-link></li>
      <li class="home-li weapons">
        <router-link to="weapons">WEAPONS</router-link>
      </li>
      <li class="home-li tiers">
        <router-link to="/tiers">TIERS</router-link>
      </li>
      <li class="home-li peripherals">
        <router-link to="/peripherals">PERIPHERALS</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1f1f1f;
}

.home-li {
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70vh;
}

a {
  padding-top: 250px;
  text-decoration: none;
  color: transparent;
  -webkit-text-stroke: 2px #f5ebeb;
}

a :visited {
  color: transparent;
}

.agents {
  font-size: 16rem;
  background-image: url("/agents2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.maps {
  font-size: 16rem;
  background-image: url("/maps2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.weapons {
  font-size: 12rem;
  background-image: url("/weapons2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.tiers {
  font-size: 16rem;
  background-image: url("/tiers2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.peripherals {
  font-size: 10rem;
  background-image: url("/peripherals2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

@media screen and (max-width: 1199px) {
  .home-li {
    min-height: 50vh;
  }

  a {
    padding-top: 150px;
  }

  .agents,
  .maps,
  .tiers {
    font-size: 8rem;
  }

  .peripherals,
  .weapons {
    font-size: 5.5rem;
  }
}

@media screen and (max-width: 699px) {
  .home-li {
    min-height: 30vh;
  }

  a {
    padding-top: 100px;
    -webkit-text-stroke: 1px #f5ebeb;
  }

  .agents,
  .maps,
  .tiers {
    font-size: 3rem;
  }

  .weapons {
    font-size: 2.5rem;
  }

  .peripherals {
    font-size: 2rem;
  }
}
</style>
