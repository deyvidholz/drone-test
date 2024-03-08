<template>
  <div>
    <div>
      <textarea
        rows="10"
        v-model="drones"
        :placeholder="inputPlaceholder"
      ></textarea>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <ul class="result" v-else> 
      <template v-for="drone in result">
        <li>
          <div class="result-item-header">
            <h2>{{ drone.name }}</h2>
          </div>
        </li>
        <template v-for="(trip, index) in drone.trips">
            <ul>
                <li>
                    <p>
                        Trip #{{index +1}}
                    </p>
                    <p>
                        {{ trip.map((item) => item.name).join(", ") }}
                    </p>
                </li>
          </ul>
        </template>
      </template>
    </ul>
    <button @click="calculate">Calculate</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api.js";
const drones = ref("");
const result = ref("");
const errorMessage = ref("");
async function calculate() {
  try {
    errorMessage.value = "";
    const response = await api.post("/delivery/calculate", {
      drones: drones.value,
    });
    result.value = response.data;
  } catch (error) {
    console.error(error);
    errorMessage.value = error.response.data.error;
  }
}

const inputPlaceholder =
  ref(`Please insert here the list of drones and locations following the format below:

Line 1: [Drone #1 Name], [#1 Maximum Weight], [Drone #2 Name], [#2 Maximum Weight], etc.
Line 2: [Location #1 Name], [Location #1 Package Weight]
Line 3: [Location #2 Name], [Location #2 Package Weight]
Line 4: [Location #3 Name], [Location #3 Package Weight]
Etc.`);
</script>

<style scoped>
textarea {
  width: 100%;
  background-color: #000000;
  padding: 10px;
  border-radius: 10px;
}

.result {
  color: black;
  text-align: left;
}

.result-item-header > h2 {
  margin: 0;
}
.result p {
  margin: 0;
}

.result ul label {
  font-weight: bold;
}

.error-message { 
    color: red;
}
</style>
