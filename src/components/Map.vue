<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import "leaflet.locatecontrol"
import L from 'leaflet'
import {onMounted, ref} from 'vue'
import { RDV } from "@/services/rdv";

const rdvs = ref<Array<RDV>>([])
const lat = 45.764043
const lon = 4.835659
let map = null

onMounted(async() => {
  map = L.map('map').setView([lat, lon], 11)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(map)
})

</script>

<template>
  <h1>Map</h1>

  <div id="map"></div>
</template>

<style scoped>
#map{
  height: 80vh;
  width: 80vw;
  margin:0 auto;
  border:8px solid white;
  border-radius: 2%;
}
</style>