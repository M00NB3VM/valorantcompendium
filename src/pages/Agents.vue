<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      agents: [],
    };
  },
  created() {
    axios
      .get("https://valorant-api.com/v1/agents")
      .then((res) => {
        this.agents = res.data.data.sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        );
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>

<script setup>
import { ref } from "vue";

const activeLetter = ref("A");
const letters = [
  "A",
  "B",
  "C",
  "F",
  "H",
  "J",
  "K",
  "N",
  "O",
  "P",
  "R",
  "S",
  "V",
  "Y",
];

function scrollTo(letter) {
  activeLetter.value = letter;
  const element = document.getElementById(letter);
  element.scrollIntoView({ behavior: "smooth" });
}

function selectActiveTab(agent, tabIndex) {
  const tabElements = document
    .getElementById(agent)
    .querySelectorAll(".ability-li");

  tabElements.forEach((el) => {
    el.classList.remove("agent-tab-active");
  });

  tabElements[tabIndex].classList.add("agent-tab-active");

  const infoElements = document
    .getElementById(agent)
    .querySelectorAll(".agent-card-tab");

  infoElements.forEach((el) => {
    el.classList.remove("agent-card-active");
    el.classList.add("hidden");
  });
  infoElements[tabIndex].classList.remove("hidden");
  infoElements[tabIndex].classList.add("agent-card-active");
}
</script>

<template>
  <div class="agents">
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
          class="letter-li"
          v-for="letter in letters"
          :key="letter"
          :class="[activeLetter === letter ? 'active-letter' : '']"
          @click="scrollTo(letter)"
        >
          {{ letter }}
        </li>
      </ul>

      <ul class="agents-ul">
        <li
          v-for="agent in agents"
          :key="agent.uuid"
          class="agent-li"
          :id="agent.displayName.charAt(0)"
        >
          <div
            v-if="agent.isPlayableCharacter"
            class="agent"
            :id="agent.displayName"
          >
            <div class="agent-profile-img">
              <img
                class="agent-img"
                :src="agent.fullPortrait"
                alt="Agent portrait"
              />
              <img
                class="agent-img-bg"
                src="pngkit_black-splatter-png_725852.png"
                alt="Black paint splash background image"
              />
            </div>

            <div class="agent-profile-info">
              <div class="agent-name">
                <h2>{{ agent.displayName.toUpperCase() }}</h2>
                <p
                  class="name-two"
                  :style="{ color: `#${agent.backgroundGradientColors[0]}` }"
                >
                  {{ agent.displayName }}
                </p>
              </div>

              <div class="card">
                <ul class="ability-icons">
                  <li
                    @click="selectActiveTab(agent.displayName, 0)"
                    class="agent-tab-active ability-li"
                  >
                    <img
                      :src="agent.role.displayIcon"
                      alt="Agent role icon"
                      class="tab-img"
                    />
                  </li>
                  <li
                    class="ability-li"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Ability1'
                    )"
                    :key="item.displayName"
                    @click="selectActiveTab(agent.displayName, 1)"
                  >
                    <img
                      :src="item.displayIcon"
                      alt="Agent ability 1 icon"
                      class="tab-img"
                    />
                  </li>
                  <li
                    class="ability-li"
                    @click="selectActiveTab(agent.displayName, 2)"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Ability2'
                    )"
                    :key="item.displayName"
                  >
                    <img
                      :src="item.displayIcon"
                      alt="Agent ability 2 icon"
                      class="tab-img"
                    />
                  </li>
                  <li
                    class="ability-li"
                    @click="selectActiveTab(agent.displayName, 3)"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Grenade'
                    )"
                    :key="item.displayName"
                  >
                    <img
                      :src="item.displayIcon"
                      alt="Agent grenade ability icon"
                      class="tab-img"
                    />
                  </li>
                  <li
                    class="ability-li"
                    @click="selectActiveTab(agent.displayName, 4)"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Ultimate'
                    )"
                    :key="item.displayName"
                  >
                    <img
                      :src="item.displayIcon"
                      alt="Agent ultimate ability icon"
                      class="tab-img"
                    />
                  </li>
                </ul>

                <ul class="agent-info">
                  <li class="agent-card-active agent-card-tab">
                    <p>{{ agent.description }}</p>
                    <h3>{{ agent.role.displayName }}</h3>
                    <p class="role-info">{{ agent.role.description }}</p>
                  </li>
                  <li
                    class="hidden agent-card-tab"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Ability1'
                    )"
                    :key="item.displayName"
                  >
                    <h4>{{ item.displayName }}</h4>
                    <p>{{ item.description }}</p>
                  </li>
                  <li
                    class="hidden agent-card-tab"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Ability2'
                    )"
                    :key="item.displayName"
                  >
                    <h4>{{ item.displayName }}</h4>
                    <p>{{ item.description }}</p>
                  </li>
                  <li
                    class="hidden agent-card-tab"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Grenade'
                    )"
                    :key="item.displayName"
                  >
                    <h4>{{ item.displayName }}</h4>
                    <p>{{ item.description }}</p>
                  </li>
                  <li
                    class="hidden agent-card-tab"
                    v-for="item in agent.abilities.filter(
                      (i) => i.slot === 'Ultimate'
                    )"
                    :key="item.displayName"
                  >
                    <h4>{{ item.displayName }}</h4>
                    <p>{{ item.description }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.none {
  display: none;
}
.hidden {
  display: none;
}

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
  height: 98%;
  padding-top: 44px;
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
  left: 40px;
  bottom: 20px;
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

.letter-li {
  height: 20px;
  width: 20px;
  font-size: 1.2rem;
  padding: 4px 10px 6px 0;
  cursor: pointer;
}

.active-letter {
  background-image: url("/active_letter.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.agents-ul {
  list-style-type: none;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
}

.agent-li {
  scroll-margin: 64px;
  margin-bottom: 100px;
}

.agent {
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.agent-profile-img {
  position: relative;
  max-width: 100%;
  height: 85vh;
}

.agent-img-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  max-width: 100%;
  max-height: 85vh;
}

.agent-img {
  max-width: 100%;
  max-height: 85vh;
}

.agent-card-tab {
  width: 500px;
  height: 300px;
}
.agent-card-active {
  display: block;
  max-width: 100%;
  padding: 40px;
  margin: 20px 0;
  background-image: url("/info-border.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  backdrop-filter: blur(8px);
}

.agent-name {
  position: relative;
  font-size: 3rem;
  padding-left: 20px;
}

.name-two {
  font-size: 4rem;
  font-family: "Splash", cursive;
  z-index: -1;
  transform: rotate(-20deg);
  position: absolute;
  top: -40px;
  left: 18%;
  letter-spacing: 8px;
}
.ability-icons {
  margin: 0;
  padding: 0 0 0 20px;
  list-style-type: none;
  display: flex;
  align-items: center;
}

.ability-li {
  width: 50px;
  height: 50px;
  padding: 15px;
  cursor: pointer;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  background-repeat: no-repeat;
  background-size: 90% 90%;
  background-position: center center;
  border: 1px solid #f5ebeb;
  margin-right: 10px;
}

h3 {
  margin-bottom: 0;
}

.role-info {
  margin-top: 4px;
}

.agent-tab-active {
  background-image: url("/current-tab-border.png");
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid red;
}

.tab-img {
  max-width: 100%;
}

.agent-info {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

@media screen and (max-width: 1399px) {
  .agent-li {
    scroll-margin: 80px;
  }
  .agent-name {
    font-size: 2.5rem;
    padding-left: 20px;
  }

  .name-two {
    font-size: 4rem;
    top: -40px;
    left: 18%;
  }

  .agent-profile-img {
    height: 70vh;
    display: flex;
    align-items: flex-end;
  }

  .agent-img-bg {
    bottom: 0;
    top: auto;
  }
  .agent-img {
    max-width: 120%;
    max-height: 70vh;
  }

  .ability-li {
    width: 40px;
    height: 40px;
    padding: 10px;
    margin-right: 10px;
  }

  .agent-card-tab {
    width: 350px;
    height: 350px;
  }
}

@media screen and (max-width: 899px) {
  .page-menu {
    display: none;
  }
  .agents-ul {
    max-width: 95%;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .agent {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .agent-li {
    margin-bottom: 30px;
  }

  h2 {
    margin-top: 10px;
  }

  h4 {
    padding-top: 15px;
  }

  .agent-profile-img {
    height: 50vh;
    display: block;
    margin-bottom: 40px;
  }

  .agent-img-bg {
    bottom: 0;
    top: 0;
    max-width: 100%;
  }
  .agent-img {
    max-width: 110%;
    max-height: 60vh;
  }
  .agent-name {
    position: relative;
    font-size: 1.8rem;
    padding-left: 0;
  }

  .name-two {
    font-size: 2.5rem;
    top: -20px;
    left: 10%;
    letter-spacing: 8px;
  }

  .ability-icons {
    padding-left: 0;
    justify-content: flex-start;
  }

  .ability-li {
    width: 30px;
    height: 30px;
    padding: 8px;
    margin-right: 4px;
  }
  .agent-card-tab {
    width: 90%;
    height: 340px;
    margin-left: auto;
    margin-right: auto;
    font-size: small;
    line-height: normal;
    background-image: url("/info-border-small.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  .agent-card-active {
    padding: 20px;
  }
}
</style>
