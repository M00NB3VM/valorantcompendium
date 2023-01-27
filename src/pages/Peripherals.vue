<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      buddies: [],
      playerCards: [],
      playerTitles: [],
      sprays: [],
    };
  },
  created() {
    axios
      .get("https://valorant-api.com/v1/buddies")
      .then((res) => {
        this.buddies = res.data.data.sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        );
      })
      .then(() => {
        axios.get("https://valorant-api.com/v1/playercards").then((res) => {
          this.playerCards = res.data.data.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
          );
        });
      })
      .then(() => {
        axios.get("https://valorant-api.com/v1/playertitles").then((res) => {
          this.playerTitles = res.data.data.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
          );
        });
      })
      .then(() => {
        axios.get("https://valorant-api.com/v1/sprays").then((res) => {
          this.sprays = res.data.data.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
          );
        });
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>

<script setup>
import { ref } from "vue";

const activeCategory = ref("Buddies");
const categories = ["Buddies", "Player cards", "Player titles", "Sprays"];

function scrollTo(category) {
  activeCategory.value = category;
  const element = document.getElementById(category);
  element.scrollIntoView({ behavior: "smooth" });
}

const showingAllBuddies = ref(false);
const showingAllCards = ref(false);
const showingAllTitles = ref(false);
const showingAllSprays = ref(false);

function showMore(category) {
  if (category === "B") {
    const allBuddies = document.querySelectorAll(".buddies-li");
    const getBuddies = Array.from(allBuddies).slice(18);
    getBuddies.forEach((b) => {
      b.classList.remove("hidden");
    });
    showingAllBuddies.value = true;
  }

  if (category === "C") {
    const allCards = document.querySelectorAll(".cards-li");
    const getCards = Array.from(allCards).slice(18);
    getCards.forEach((b) => {
      b.classList.remove("hidden");
    });
    showingAllCards.value = true;
  }

  if (category === "T") {
    const allTitles = document.querySelectorAll(".titles-li");
    const getTitles = Array.from(allTitles).slice(18);
    getTitles.forEach((b) => {
      b.classList.remove("hidden");
    });
    showingAllTitles.value = true;
  }

  if (category === "S") {
    const allSprays = document.querySelectorAll(".sprays-li");
    const getSprays = Array.from(allSprays).slice(18);
    getSprays.forEach((b) => {
      b.classList.remove("hidden");
    });
    showingAllSprays.value = true;
  }
}
</script>

<template>
  <div class="peripherals">
    <div class="loader battery" v-if="loading"></div>
    <div class="bg"><img src="/valo.png" /></div>
    <div class="decor">
      <div class="dot-one"></div>
      <div class="corner-one"></div>
      <div class="dot-two"></div>
      <div class="dot-three"></div>
      <div class="dot-four"></div>
      <div class="dot-five"></div>
      <div class="corner-two"></div>
      <div class="line"></div>
      <div class="play"></div>
    </div>

    <div v-if="!loading">
      <ul class="page-menu">
        <li class="back-arrow">
          <router-link to="/"
            ><button class="back-button"></button
          ></router-link>
        </li>
        <li
          class="category-li"
          v-for="category in categories"
          :key="category"
          :class="[activeCategory === category ? 'active-category' : '']"
          @click="scrollTo(category)"
        >
          {{ category }}
        </li>
      </ul>

      <h2 id="Buddies">BUDDIES</h2>
      <ul class="buddies-ul">
        <li
          v-for="buddie in buddies.slice(0, 18)"
          :key="buddie.uuid"
          class="buddies-li"
        >
          <p class="buddie-name">{{ buddie.displayName }}</p>
          <img :src="buddie.displayIcon" alt="Budddie" class="buddie-img" />
        </li>
        <li
          v-for="buddie in buddies.slice(18)"
          :key="buddie.uuid"
          class="buddies-li hidden"
        >
          <p class="buddie-name">{{ buddie.displayName }}</p>
          <img :src="buddie.displayIcon" alt="Budddie" class="buddie-img" />
        </li>
      </ul>
      <button
        @click="showMore('B')"
        v-if="!showingAllBuddies"
        class="show-all-button"
      >
        Show all buddies
      </button>

      <h2 id="Player cards">PLAYER CARDS</h2>
      <ul class="cards-ul">
        <li
          v-for="card in playerCards.slice(0, 18)"
          :key="card.uuid"
          class="cards-li"
        >
          <p class="card-name">{{ card.displayName }}</p>
          <img :src="card.largeArt" alt="Player card" class="card-img" />
        </li>
        <li
          v-for="card in playerCards.slice(18)"
          :key="card.uuid"
          class="hidden cards-li"
        >
          <p class="card-name">{{ card.displayName }}</p>
          <img :src="card.largeArt" alt="Player card" class="card-img" />
        </li>
      </ul>
      <button
        @click="showMore('C')"
        v-if="!showingAllCards"
        class="show-all-button"
      >
        Show all player cards
      </button>

      <h2 id="Player titles">PLAYER TITLES</h2>
      <ul class="titles-ul">
        <li
          class="titles-li"
          v-for="title in playerTitles
            .filter((t) => t.titleText !== null)
            .slice(0, 18)"
          :key="title.uuid"
        >
          <p class="title-name">{{ title.titleText }}</p>
        </li>
        <li
          class="titles-li hidden"
          v-for="title in playerTitles
            .filter((t) => t.titleText !== null)
            .slice(18)"
          :key="title.uuid"
        >
          <p class="title-name">{{ title.titleText }}</p>
        </li>
      </ul>
      <button
        @click="showMore('T')"
        v-if="!showingAllTitles"
        class="show-all-button"
      >
        Show all player titles
      </button>

      <h2 id="Sprays">SPRAYS</h2>
      <ul class="sprays-ul">
        <li
          v-for="spray in sprays.slice(0, 18)"
          :key="spray.uuid"
          class="sprays-li"
        >
          <p class="spray-name">{{ spray.displayName }}</p>
          <img
            :src="spray.fullTransparentIcon || spray.displayIcon"
            alt="Spray"
            class="spray-img"
          />
        </li>
        <li
          v-for="spray in sprays.slice(18)"
          :key="spray.uuid"
          class="sprays-li hidden"
        >
          <p class="spray-name">{{ spray.displayName }}</p>
          <img
            :src="spray.fullTransparentIcon || spray.displayIcon"
            alt="Spray"
            class="spray-img"
          />
        </li>
      </ul>
      <button
        @click="showMore('S')"
        v-if="!showingAllSprays"
        class="show-all-button"
      >
        Show all sprays
      </button>
    </div>
  </div>
</template>

<style scoped>
.loader {
  margin-top: 50px;
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
}
/**
  * battery
  * a stepped battery indicator
  * @author jh3y
*/
.battery {
  height: 60px;
  width: 40px;
  background: transparent;
  border-radius: 2px;
  border: 5px solid #ff4655;
  position: relative;
  transform: rotate(90deg);
}
.battery:before {
  content: "";
  height: 12px;
  width: 20px;
  background: #ff4655;
  position: absolute;
  bottom: 100%;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  border-radius: 2px;
}
.battery:after {
  -webkit-animation: battery-charge 1s infinite steps(6);
  animation: battery-charge 1s infinite steps(6);
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(transparent),
    color-stop(5%, transparent),
    color-stop(5%, #ff4655),
    color-stop(19%, #ff4655),
    color-stop(19%, transparent),
    color-stop(24%, transparent),
    color-stop(24%, #ff4655),
    color-stop(38%, #ff4655),
    color-stop(38%, transparent),
    color-stop(43%, transparent),
    color-stop(43%, #ff4655),
    color-stop(57%, #ff4655),
    color-stop(57%, transparent),
    color-stop(62%, transparent),
    color-stop(62%, #ff4655),
    color-stop(76%, #ff4655),
    color-stop(76%, transparent),
    color-stop(81%, transparent),
    color-stop(81%, #ff4655),
    color-stop(95%, #ff4655),
    color-stop(95%, transparent)
  );
  background: linear-gradient(
    0deg,
    transparent,
    transparent 5%,
    #ff4655 5%,
    #ff4655 19%,
    transparent 19%,
    transparent 24%,
    #ff4655 24%,
    #ff4655 38%,
    transparent 38%,
    transparent 43%,
    #ff4655 43%,
    #ff4655 57%,
    transparent 57%,
    transparent 62%,
    #ff4655 62%,
    #ff4655 76%,
    transparent 76%,
    transparent 81%,
    #ff4655 81%,
    #ff4655 95%,
    transparent 95%
  );
  content: "";
  height: 100%;
  left: 50%;
  position: absolute;
  top: 0;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: 24px;
}

@-webkit-keyframes battery-charge {
  0% {
    -webkit-clip-path: inset(100% 0 0 0);
    clip-path: inset(100% 0 0 0);
  }
  100% {
    -webkit-clip-path: inset(-18% 0 0 0);
    clip-path: inset(-18% 0 0 0);
  }
}

@keyframes battery-charge {
  0% {
    -webkit-clip-path: inset(100% 0 0 0);
    clip-path: inset(100% 0 0 0);
  }
  100% {
    -webkit-clip-path: inset(-18% 0 0 0);
    clip-path: inset(-18% 0 0 0);
  }
}
.bg {
  z-index: -99;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: right;
}
.bg img {
  max-width: 100%;
  height: 95%;
  padding-top: 45px;
}
.dot-one {
  width: 6px;
  height: 6px;
  background-color: #ff4655;
  position: fixed;
  left: 20%;
  top: 150px;
  z-index: -50;
  animation: blink 1s steps(5, start) infinite;
}

@keyframes blink {
  0% {
    opacity: 0.4;
  }
  5% {
    opacity: 0.5;
  }
  10% {
    opacity: 0.6;
  }
  15% {
    opacity: 0.85;
  }
  25% {
    opacity: 0.5;
  }
  30% {
    opacity: 1;
  }
  35% {
    opacity: 0.1;
  }
  40% {
    opacity: 0.25;
  }
  45% {
    opacity: 0.5;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.85;
  }
  80% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.dot-two {
  width: 6px;
  height: 6px;
  background-color: #ff4655;
  position: fixed;
  left: 50%;
  top: 300px;
  z-index: -50;
}

.dot-three {
  width: 6px;
  height: 6px;
  background-color: #ff4655;
  position: fixed;
  left: 45%;
  top: 250px;
  z-index: -50;
}
.dot-four {
  width: 6px;
  height: 6px;
  background-color: #ff4655;
  position: fixed;
  right: 20%;
  bottom: 250px;
  z-index: -50;
}

.dot-five {
  width: 6px;
  height: 6px;
  background-color: #ff4655;
  position: fixed;
  right: 15%;
  bottom: 300px;
  z-index: -50;
  animation: blink 1s steps(5, start) infinite;
}

.corner-one {
  width: 15px;
  height: 15px;
  position: fixed;
  right: 15%;
  top: 150px;
  z-index: -50;
  background-image: url("/corner.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.corner-two {
  width: 15px;
  height: 15px;
  position: fixed;
  left: 15%;
  bottom: 50px;
  z-index: -50;
  transform: rotateX(180deg);
  background-image: url("/corner.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.line {
  height: 2px;
  width: 800px;
  background-color: #ff4655;
  position: fixed;
  right: 20%;
  bottom: 150px;
  z-index: -50;
  animation: sweep 16s linear infinite;
}

@keyframes sweep {
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  10% {
    opacity: 1;
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(25%);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.play {
  width: 100px;
  height: 100px;
  position: fixed;
  left: 40%;
  bottom: 200px;
  z-index: -50;
  background-image: url("/valo2.png");
  background-size: contain;
  background-repeat: no-repeat;
  animation: flicker 3s linear infinite;
}

@keyframes flicker {
  0%,
  19.999%,
  22%,
  62.999%,
  64%,
  64.999%,
  70%,
  100% {
    opacity: 0.99;
  }
  20%,
  21.999%,
  63%,
  63.999%,
  65%,
  69.999% {
    opacity: 0.4;
  }
}
.page-menu {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80%;
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 3;
}

.back-arrow {
  margin-bottom: auto;
}

.back-button {
  width: 1.8rem;
  height: 1.8rem;
  background-color: transparent;
  background-image: url("/chevron_back_arrow_light.png");
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  border: none;
}

.category-li {
  height: 20px;
  font-size: 1.2rem;
  padding: 4px 10px 6px 0;
}

.active-category {
  background-image: url("/active_letter.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
}
.peripherals {
  max-width: 80%;
  margin-left: auto;
  margin-right: 20px;
}

h2 {
  scroll-margin: 64px;
}
.buddies-ul,
.sprays-ul,
.cards-ul,
.titles-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.buddies-li,
.sprays-li {
  margin: 0 10px 10px 0;
  border: 1px solid #f5ebeb;
  width: 200px;
  height: 250px;
  text-align: center;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}

.titles-li {
  margin: 0 10px 10px 0;
  border: 1px solid #f5ebeb;
  width: 300px;
  text-align: center;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}

.buddie-name,
.spray-name,
.title-name {
  padding: 4px 10px;
  margin-bottom: 10px;
}

.buddie-img,
.spray-img {
  min-width: 100px;
  max-width: 100%;
  max-height: 150px;
}

.cards-li {
  margin: 0 10px 10px 0;
  padding-bottom: 8px;
  border: 1px solid #f5ebeb;
  width: 200px;
  height: 500px;
  text-align: center;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.card-name {
  padding: 0;
  margin: 4px 0;
}
.card-img {
  max-width: 90%;
  margin-bottom: 4px;
}

.show-all-button {
  font-family: "Nunito Sans", sans-serif;
  background-color: #1f1f1f;
  border: 1px solid #f5ebeb;
  color: #f5ebeb;
  margin: 20px 0 40px 0;
  padding: 10px 50px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;
}

.show-all-button:hover {
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.3);
}

.hidden {
  display: none;
}

@media screen and (max-width: 1000px) {
  .peripherals {
    max-width: 70%;
    margin-left: auto;
    margin-right: 20px;
  }
}

@media screen and (max-width: 699px) {
  .page-menu {
    display: none;
  }

  .peripherals {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  h2 {
    text-align: center;
  }

  .buddies-ul,
  .sprays-ul,
  .cards-ul,
  .titles-ul {
    justify-content: center;
    padding: 0;
  }

  .cards-li {
    width: 100px;
    height: 300px;
    justify-content: space-between;
    font-size: x-small;
    line-height: normal;
    padding: 0;
    margin: 4px;
  }

  .buddie-name {
    padding: 2px 0 5px 0;
    margin: 2px;
  }

  .buddies-li,
  .sprays-li {
    margin: 0 4px 4px 0;
    width: 100px;
    height: 180px;
    font-size: x-small;
    line-height: normal;
  }

  .buddies-li img {
    max-width: 100%;
    max-height: 110px;
  }
}
</style>
