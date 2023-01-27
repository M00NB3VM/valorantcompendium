<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      maps: [],
      lineMap: false,
      currentLineMap: "",
    };
  },
  created() {
    axios
      .get("https://valorant-api.com/v1/maps")
      .then((res) => {
        this.maps = res.data.data.sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        );
      })
      .then(() => {
        this.maps.pop();
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    findMap(map) {
      this.lineMap = !this.lineMap;
      const currentMap = this.maps.filter(
        (item) => item.displayName === map.name
      );
      this.currentLineMap = currentMap[0].displayIcon;
    },
  },
};
</script>

<script setup>
import { ref } from "vue";

const activeMap = ref("01");
const mapsList = [
  {
    number: "01",
    name: "Ascent",
    description:
      "An open playground for small wars of position and attrition divide two sites on Ascent. Each site can be fortified by irreversible bomb doors; once they're down, you'll have to destroy them or find another way. Yield as little territory as possible.",
  },
  {
    number: "02",
    name: "Bind",
    description:
      "Two sites. No middle. Gotta pick left or right. What's it going to be then? Both offer direct paths for attackers and a pair of one-way teleporters make it easier to flank.",
  },
  {
    number: "03",
    name: "Breeze",
    description:
      "Take in the sights of historic ruins or seaside caves on this tropical paradise. But bring some cover. You'll need them for the wide open spaces and long range engagements. Watch your flanks and this will be a Breeze.",
  },
  {
    number: "04",
    name: "Fracture",
    description:
      "A top secret research facility split apart by a failed radianite experiment. With defender options as divided as the map, the choice is yours: meet the attackers on their own turf or batten down the hatches to weather the assault.",
  },
  {
    number: "05",
    name: "Haven",
    description:
      "Beneath a forgotten monastery, a clamour emerges from rival Agents clashing to control three sites. There's more territory to control, but defenders can use the extra real estate for aggressive pushes.",
  },
  {
    number: "06",
    name: "Icebox",
    description:
      "Your next battleground is a secret Kingdom excavation site overtaken by the arctic. The two plant sites protected by snow and metal require some horizontal finesse. Take advantage of the ziplines and they'll never see you coming.",
  },
  {
    number: "07",
    name: "Lotus",
    description:
      "A mysterious structure housing an astral conduit radiates with ancient power. Great stone doors provide a variety of movement opportunities and unlock the paths to three mysterious sites.",
  },
  {
    number: "08",
    name: "Pearl",
    description:
      "Attackers push down into the Defenders on this two-site map set in a vibrant, underwater city. Pearl is a geo-driven map with no mechanics. Take the fight through a compact mid or the longer range wings in our first map set in Omega Earth.",
  },
  {
    number: "09",
    name: "Split",
    description:
      "If you want to go far, you'll have to go up. A pair of sites split by an elevated center allows for rapid movement using two rope ascenders. Each site is built with a looming tower vital for control. Remember to watch above before it all blows sky-high.",
  },
];

function scrollTo(number) {
  activeMap.value = number;
  const element = document.getElementById(number);
  element.scrollIntoView({ block: "end", behavior: "smooth" });
}
</script>

<template>
  <div>
    <div class="loader battery" v-if="loading"></div>
    <div v-if="!loading">
      <ul class="page-menu">
        <li class="back-arrow">
          <router-link to="/"
            ><button class="back-button"></button
          ></router-link>
        </li>
        <li
          class="number-li"
          v-for="map in mapsList"
          :key="map.number"
          :class="[activeMap === map.number ? 'active-map' : '']"
          @click="scrollTo(map.number)"
        >
          {{ map.number }}
        </li>
      </ul>

      <ul class="maps-ul">
        <li v-for="map in maps" :key="map.uuid" class="map-li">
          <div class="map-card">
            <div
              v-for="m in mapsList.filter((i) => i.name === map.displayName)"
              :key="m.number"
            >
              <button @click="findMap(m)" class="open-modal-button">
                <img
                  src="/map_icon_pointer.png"
                  alt="Show map"
                  class="modal-button-pointer"
                />
              </button>
              <div v-show="lineMap">
                <div class="show-map">
                  <div class="modal-content">
                    <button @click="lineMap = false" class="close-modal-button">
                      CLOSE
                    </button>
                    <img :src="currentLineMap" alt="Map" class="line-map" />
                  </div>
                </div>
              </div>
            </div>

            <h2 class="map-name">{{ map.displayName.toUpperCase() }}</h2>
            <p
              v-for="item in mapsList.filter((i) => i.name === map.displayName)"
              :key="item.number"
              class="map-info"
              :id="item.number"
            >
              {{ item.description }}
            </p>
          </div>

          <img :src="map.splash" alt="Map" class="map-img" />
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

.number-li {
  height: 20px;
  width: 26px;
  font-size: 1.2rem;
  padding: 4px 10px 6px 0;
  cursor: pointer;
}

.active-map {
  background-image: url("/active_letter.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
}

.maps-ul {
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0;
}

.map-li {
  margin: 0;
  padding: 0;
  position: relative;
  max-height: 96vh;
}

.map-card {
  max-width: 400px;
  position: absolute;
  right: 40px;
  bottom: 40px;
}

.map-name {
  padding: 6px 0;
  margin: 0;
  font-size: 3rem;
  backdrop-filter: blur(10px);
}

.map-info {
  border: 1px solid #f5ebeb;
  background-image: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  scroll-margin: 58px;
}
.map-img {
  max-width: 100%;
  display: block;
}
.open-modal-button {
  width: 40px;
  height: 40px;
  background-image: url("/map_icon.png");
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  margin-left: auto;
  cursor: pointer;
  padding: 0;
}

.modal-button-pointer {
  width: 40px;
  height: 40px;
  animation: float 1.5s ease-in-out infinite;
}

@keyframes float {
  0% {
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
  }
}

.modal-button-pointer img {
  max-width: 100%;
}

.close-modal-button {
  background-color: #ff4655;
  border: none;
  color: #f5ebeb;
  font-weight: 900;
  display: block;
  margin-left: auto;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
}
.show-map {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.15);
}
.modal-content {
  max-width: 90%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.line-map {
  max-width: 100%;
  max-height: 90vh;
}

@media screen and (max-width: 699px) {
  .page-menu {
    display: none;
  }

  .map-li {
    padding-bottom: 80px;
    margin: 40px 0 100px 0;
  }
  .map-card {
    bottom: -100px;
    right: 10px;
    left: 10px;
    padding-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .map-name {
    font-size: 2rem;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .map-info {
    font-size: small;
    line-height: normal;
    min-height: 150px;
    scroll-margin: 150px;
  }

  .modal-button-pointer {
    width: 30px;
    height: 30px;
  }

  .line-map {
    padding-top: 30px;
  }
}
</style>
