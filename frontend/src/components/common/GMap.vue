<template>

  <div ref="mapContainer" class="h-full">

  </div>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader"

const mapContainer = ref(null)
const map = ref(null as any)

const additionalOptions = {
  mapTypeId: 'hybrid',
}

const loader = new Loader({
  apiKey: "AIzaSyDVdLGa1TVbFiPLEesk_dcp2zyJmV0dqVA",
  version: "weekly",
  // ...additionalOptions,
});

loader.load().then(async () => {
  if (mapContainer.value) {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map.value = new Map(mapContainer.value as HTMLElement, {
      center: { lat: 27.964157, lng: -82.452606 },
      zoom: 8,
      mapTypeId: 'hybrid'
    });
  }
});

</script>

<style>

</style>
