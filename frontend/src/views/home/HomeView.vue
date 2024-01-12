<template>

	<NavBarElement />

	<MainSection />

	<AboutSection />

	<ServiceSection />

	<PortfolioSection />

	<ContactSection />

  <FooterElement />

</template>

<script lang="ts" setup>
import MainSection from '@/components/home/sections/MainSection.vue';
import AboutSection from '@/components/home/sections/AboutSection.vue';
import ServiceSection from '@/components/home/sections/ServiceSection.vue';
import PortfolioSection from '@/components/home/sections/PortfolioSection.vue';
import ContactSection from '@/components/home/sections/ContactSection.vue';
import FooterElement from '@/components/home/FooterElement.vue'
import NavBarElement from '@/components/home/NavbarElement.vue'
</script>

<style scoped>


</style>