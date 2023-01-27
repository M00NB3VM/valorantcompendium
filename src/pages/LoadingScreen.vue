<script setup></script>

<template>
  <div class="loading-screen">
    <p>"They look like us, but are they us?"</p>
    <div class="down-arrows-div">
      <img
        class="down-arrows"
        src="/chevron_down_arrows.png"
        alt="down arrows"
      />
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  z-index: 2;
  background-color: #ece8e1;
  color: #1f1f1f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: fade 4s 1 linear;
  -webkit-animation: fade 4s;
  -moz-animation: fade 4s;
  -o-animation: fade 4s;
  -ms-animation: fade 4s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  font-size: 1.5rem;
}

.down-arrows-div {
  width: 40px;
  height: auto;
  position: absolute;
  bottom: 50px;
}
.down-arrows {
  max-width: 100%;
}

@keyframes fade {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@media screen and (max-width: 699px) {
  .loading-screen {
    font-size: 0.8rem;
  }
}
</style>
