<template>

  <div ref="mapContainer" class="h-full">

  </div>

</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader"

const props = defineProps(['campaign', 'respondent'])

const mapContainer = ref(null)
const map = ref(null as any)
// const markers = ref([] as any[])
const marker = ref(null as any)
const gmaps = ref(null as any)

const additionalOptions = {
  mapTypeId: 'hybrid',
}

const loader = new Loader({
  apiKey: "AIzaSyDVdLGa1TVbFiPLEesk_dcp2zyJmV0dqVA",
  version: "weekly",
  // ...additionalOptions,
});

const loadMarkers = async () => {
  try {
    if (props.respondent && gmaps.value && map.value) {
      const geocoder = new gmaps.value.Geocoder()
      const person = props.respondent
      const address = `${person.address1}${person.address2 ? '' : ` ${person.address2}`}, ${person.city} ${person.state} ${person.zip}`
      const { results } = await geocoder.geocode({ address })
      console.log(results)
      const location = results[0].geometry.location;
      const latLng = { lat: location.lat(), lng: location.lng() }
      marker.value = new gmaps.value.Marker({
        position: latLng,
        map: map.value,
        title: `${person.firstName} ${person.lastName}`
      })
      const newMapCenter = new gmaps.value.LatLng(latLng.lat, latLng.lng)
      map.value.setZoom(10)
      map.value.panTo(newMapCenter)
      map.value.setZoom(18)
      // console.log(map.value)
    } else if (marker.value) {
      marker.value.setMap(null)
    }
  } catch(err) {
    console.log(err)
  }
}

watch(() => props.respondent, () => {
  loadMarkers()
})

loader.load().then(async () => {
  if (mapContainer.value) {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map.value = new Map(mapContainer.value as HTMLElement, {
      center: { lat: 27.964157, lng: -82.452606 },
      zoom: 8,
      mapTypeId: 'hybrid'
    });
    gmaps.value = google.maps
  }
});

</script>

<style>

</style>
