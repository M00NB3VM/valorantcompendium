<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      weapons: [],
      melee: [],
    };
  },
  created() {
    axios
      .get("https://valorant-api.com/v1/weapons")
      .then((res) => {
        this.melee = res.data.data.filter((w) => w.displayName === "Melee");

        this.weapons = res.data.data
          .filter((w) => w.displayName !== "Melee")
          .sort((a, b) => a.displayName.localeCompare(b.displayName));
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>

<script setup>
import { ref } from "vue";
const activeWeaponClass = ref("Heavies");
const weaponClasses = [
  "Heavies",
  "Melee",
  "Rifles",
  "Shotguns",
  "Sidearms",
  "SMG",
  "Snipers",
];

function scrollTo(category) {
  activeWeaponClass.value = category;
  const element = document.getElementById(category);
  element.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div>
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
          class="weaponclass-li"
          v-for="weaponClass in weaponClasses"
          :key="weaponClass"
          :class="[
            activeWeaponClass === weaponClass ? 'active-weaponclass' : '',
          ]"
          @click="scrollTo(weaponClass)"
        >
          {{ weaponClass }}
        </li>
      </ul>

      <ul class="weapons-ul">
        <li id="Heavies" class="weapon-li">
          <h2>HEAVY WEAPONS</h2>
          <div
            v-for="weapon in weapons.filter(
              (w) => w.shopData.category === 'Heavy Weapons'
            )"
            :key="weapon.uuids"
            class="weapon-div"
          >
            <img class="weapon-img" :src="weapon.displayIcon" alt="Weapon" />
            <h3>{{ weapon.displayName }}</h3>
            <div class="weapon-info">
              <p>Cost: {{ weapon.shopData.cost }}</p>
              <p>Fire rate: {{ weapon.weaponStats.fireRate }}</p>
              <p>Reload time: {{ weapon.weaponStats.reloadTimeSeconds }}s</p>
              <p>
                Accuracy 1st bullet:
                {{ weapon.weaponStats.firstBulletAccuracy }}
              </p>
              <p>
                Wall penetration level:
                {{ weapon.weaponStats.wallPenetration.split("::")[1] }}
              </p>
            </div>
          </div>
        </li>

        <li v-for="item in melee" :key="item.uuid" id="Melee" class="weapon-li">
          <h2>MELEE</h2>
          <div class="weapon-div">
            <img :src="item.displayIcon" alt="melee" class="weapon-img" />
            <h3>Tactical knife</h3>
            <dl class="weapon-info melee-ul">
              <dt>Attributes</dt>
              <dd>Run fast</dd>
              <dd>Destroy objects fast</dd>
              <dd>One-shot enemies in the back (alt. fire)</dd>
            </dl>
          </div>
        </li>

        <li id="Rifles" class="weapon-li">
          <h2>RIFLES</h2>
          <div
            class="weapon-div"
            v-for="weapon in weapons.filter(
              (w) => w.shopData.category === 'Rifles'
            )"
            :key="weapon.uuids"
          >
            <img class="weapon-img" :src="weapon.displayIcon" alt="Weapon" />
            <h3>{{ weapon.displayName }}</h3>
            <div class="weapon-info">
              <p>Cost: {{ weapon.shopData.cost }}</p>
              <p>Fire rate: {{ weapon.weaponStats.fireRate }}</p>
              <p>Reload time: {{ weapon.weaponStats.reloadTimeSeconds }}s</p>
              <p>
                Accuracy 1st bullet:
                {{ weapon.weaponStats.firstBulletAccuracy }}
              </p>
              <p>
                Wall penetration level:
                {{ weapon.weaponStats.wallPenetration.split("::")[1] }}
              </p>
            </div>
          </div>
        </li>

        <li id="Shotguns" class="weapon-li">
          <h2>SHOTGUNS</h2>
          <div
            v-for="weapon in weapons.filter(
              (w) => w.shopData.category === 'Shotguns'
            )"
            :key="weapon.uuids"
            class="weapon-div"
          >
            <img class="weapon-img" :src="weapon.displayIcon" alt="Weapon" />
            <h3>{{ weapon.displayName }}</h3>
            <div class="weapon-info">
              <p>Cost: {{ weapon.shopData.cost }}</p>
              <p>Fire rate: {{ weapon.weaponStats.fireRate }}</p>
              <p>Reload time: {{ weapon.weaponStats.reloadTimeSeconds }}s</p>
              <p>
                Accuracy 1st bullet:
                {{ weapon.weaponStats.firstBulletAccuracy }}
              </p>
              <p>
                Wall penetration level:
                {{ weapon.weaponStats.wallPenetration.split("::")[1] }}
              </p>
            </div>
          </div>
        </li>

        <li id="Sidearms" class="weapon-li">
          <h2>SIDEARMS</h2>
          <div
            v-for="weapon in weapons.filter(
              (w) => w.shopData.categoryText === 'Sidearms'
            )"
            :key="weapon.uuids"
            class="weapon-div"
          >
            <img class="weapon-img" :src="weapon.displayIcon" alt="Weapon" />
            <h3>{{ weapon.displayName }}</h3>
            <div class="weapon-info">
              <p>Cost: {{ weapon.shopData.cost }}</p>
              <p>Fire rate: {{ weapon.weaponStats.fireRate }}</p>
              <p>Reload time: {{ weapon.weaponStats.reloadTimeSeconds }}s</p>
              <p>
                Accuracy 1st bullet:
                {{ weapon.weaponStats.firstBulletAccuracy }}
              </p>
              <p>
                Wall penetration level:
                {{ weapon.weaponStats.wallPenetration.split("::")[1] }}
              </p>
            </div>
          </div>
        </li>

        <li id="SMG" class="weapon-li">
          <h2>SMGs</h2>
          <div
            v-for="weapon in weapons.filter(
              (w) => w.shopData.category === 'SMGs'
            )"
            :key="weapon.uuids"
            class="weapon-div"
          >
            <img class="weapon-img" :src="weapon.displayIcon" alt="Weapon" />
            <h3>{{ weapon.displayName }}</h3>
            <div class="weapon-info">
              <p>Cost: {{ weapon.shopData.cost }}</p>
              <p>Fire rate: {{ weapon.weaponStats.fireRate }}</p>
              <p>Reload time: {{ weapon.weaponStats.reloadTimeSeconds }}s</p>
              <p>
                Accuracy 1st bullet:
                {{ weapon.weaponStats.firstBulletAccuracy }}
              </p>
              <p>
                Wall penetration level:
                {{ weapon.weaponStats.wallPenetration.split("::")[1] }}
              </p>
            </div>
          </div>
        </li>

        <li id="Snipers" class="weapon-li">
          <h2>SNIPERS</h2>
          <div
            v-for="weapon in weapons.filter(
              (w) => w.shopData.category === 'Sniper Rifles'
            )"
            :key="weapon.uuids"
            class="weapon-div"
          >
            <img class="weapon-img" :src="weapon.displayIcon" alt="Weapon" />
            <h3>{{ weapon.displayName }}</h3>
            <div class="weapon-info">
              <p>Cost: {{ weapon.shopData.cost }}</p>
              <p>Fire rate: {{ weapon.weaponStats.fireRate }}</p>
              <p>Reload time: {{ weapon.weaponStats.reloadTimeSeconds }}s</p>
              <p>
                Accuracy 1st bullet:
                {{ weapon.weaponStats.firstBulletAccuracy }}
              </p>
              <p>
                Wall penetration level:
                {{ weapon.weaponStats.wallPenetration.split("::")[1] }}
              </p>
            </div>
          </div>
        </li>
      </ul>
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

.weaponclass-li {
  height: 20px;
  font-size: 1.2rem;
  padding: 4px 10px 6px 0;
  cursor: pointer;
}

.active-weaponclass {
  background-image: url("/active_letter.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
}

.weapons-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 70%;
  margin-left: auto;
  margin-right: 50px;
}

.weapon-li {
  margin: 0 0 40px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  scroll-margin: 65px;
  background-image: linear-gradient(
    140deg,
    rgba(255, 70, 85, 0.3),
    rgba(255, 70, 85, 0)
  );
  border: 1px solid #ff4655;
}

.weapon-div {
  width: 44%;
  height: 45vh;
  margin: 10px;
  padding: 20px 10px;
  border: 1px solid #f5ebeb;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}

.weapon-div p {
  margin: 4px 10px;
}

h2 {
  font-size: 2rem;
  margin: 20px 0 20px 10px;
  padding: 0;
  width: 100%;
}
h3 {
  margin: 20px 0 20px 10px;
}
.weapon-img {
  max-width: 100%;
  max-height: 200px;
  padding-top: 20px;
}

.weapon-info {
  padding: 0;
  margin: 0;
}

.melee-ul {
  margin-left: 10px;
}

@media screen and (max-width: 1200px) {
  .weapon-div {
    width: 40%;
    height: 45vh;
  }
}

@media screen and (max-width: 699px) {
  .page-menu {
    display: none;
  }

  .weapons-ul {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .weapon-li {
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
  }

  .weapon-div {
    max-width: 80%;
    width: 80%;
    height: auto;
    margin: 10px 0;
    padding: 4px;
  }

  h2 {
    font-size: 1.3rem;
    margin: 10px 4px 10px 4px;
    width: auto;
  }

  h3 {
    font-size: 1.2rem;
    margin: 2px 10px;
  }
  dd {
    margin: 0;
  }
}
</style>
