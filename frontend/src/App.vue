<script setup>
import DroneDelivery from "./components/DroneDelivery.vue";
</script>

<template>
  <div>
    <img src="/camera-drone.png" class="logo" alt="Drone" />
  </div>
  <DroneDelivery />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em black);
}
</style>
./components/Drone.vue
