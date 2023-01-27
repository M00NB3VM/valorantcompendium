<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      tiers: [],
    };
  },
  created() {
    axios
      .get("https://valorant-api.com/v1/competitivetiers")
      .then((res) => {
        this.tiers = res.data.data.find(
          (item) => item.assetObjectName === "Episode5_CompetitiveTierDataTable"
        ).tiers;
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>

<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="tiers-page">
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
      <ul class="tiers-ul">
        <li
          class="tiers-li"
          v-for="tier in tiers.filter((t) => t.tierName === 'UNRANKED')"
          :key="tier.tier"
        >
          <p>{{ tier.tierName }}</p>
          <img class="tier-img" :src="tier.largeIcon" alt="Unranked icon" />
        </li>
        <li>
          <ul class="three-level-tiers-ul">
            <li
              class="three-level-tiers-li"
              v-for="tier in tiers.filter(
                (t) =>
                  t.tierName !== 'Unused1' &&
                  t.tierName !== 'Unused2' &&
                  t.tierName !== 'UNRANKED' &&
                  t.tierName !== 'RADIANT'
              )"
              :key="tier.tier"
            >
              <p>{{ tier.tierName }}</p>
              <img class="tier-img" :src="tier.largeIcon" alt="Rank icon" />
            </li>
          </ul>
        </li>

        <li
          class="tiers-li"
          v-for="tier in tiers.filter((t) => t.tierName === 'RADIANT')"
          :key="tier.tier"
        >
          <p>{{ tier.tierName }}</p>
          <img class="tier-img" :src="tier.largeIcon" alt="Radiant icon" />
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
.tiers-ul {
  max-width: 55%;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.tiers-li {
  display: flex;
  flex-direction: column;
  max-width: 25%;
  align-items: center;
  border: 1px solid #f5ebeb;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  margin: 0 0 30px 0;
}

.three-level-tiers-ul {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: space-between;
}

.three-level-tiers-li {
  max-width: 28%;
  text-align: center;
  margin: 0 10px 30px 0;
  border: 1px solid #f5ebeb;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}
.tier-img {
  max-width: 70%;
  padding-bottom: 10px;
}

@media screen and (max-width: 699px) {
  .tiers-ul {
    font-size: x-small;
    max-width: 90%;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  .tiers-li,
  .three-level-tiers-li {
    margin: 4px 0;
    max-width: 30%;
  }
}
</style>
