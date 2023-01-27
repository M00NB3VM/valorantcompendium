<script setup></script>

<template>
  <footer>
    <ul>
      <li>
        <p>This is a school project. Created by M00NB3VM, 2023.</p>
        <a href="https://github.com/M00NB3VM">Github</a>
      </li>
      <li>
        <p>
          Using the <a href="https://valorant-api.com/">Valorant-API</a>, a
          non-official API and not endorsed by Riot Games.
        </p>
      </li>
      <li>
        <p>
          Riot Games, Valorant, and all associated properties are trademarks or
          registered trademarks of Riot Games, Inc.
        </p>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1f1f1f;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 10px;
}

li {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: x-small;
}

p {
  padding: 0;
  margin: 0;
}

a {
  color: #f5ebeb;
  text-decoration: underline;
}

a :visited {
  color: #f5ebeb;
}
</style>
