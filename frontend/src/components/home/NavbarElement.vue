<template>
    <!-- Navbar start -->
    <nav class="w-screen fixed bg-primary bg-opacity-80 p-4 lg:px-20 flex justify-between z-50">
		<!-- Logo start -->
		<div class="overflow-hidden flex flex-col justify-center">
			<p class="tracking-widest font-extrabold text-3xl text-white">PACK<span class="text-cyan-400">THEM</span>IN</p>
		</div>
		<!-- Logo end -->

		<!-- Toggler start -->
		<button ref="menu" role="menubar" class="md:hidden mr-4" @click="navToggle()">
			<i class="pi pi-align-justify text-white" style="font-size: 2rem"></i>
		</button>
		<!-- Toggler end -->

		<!-- Menu content start -->
		<div class="absolute left-0 right-0 translate-y-16 bg-opacity-90 bg-white md:bg-none md:bg-opacity-0 shadow hidden md:flex flex-col gap-4 items-center p-4 md:flex-row md:static md:shadow-none md:translate-y-0 text-white" role="menu" aria-expanded="false">
			<!-- Links start -->
			<a href="#" class="menuitem">
				<p class="mx-4">Home</p>
			</a>

			<a href="#about-section" class="menuitem">
				<p class="mx-4">About</p>
			</a>

			<a href="#services-section" class="menuitem">
				<p class="mx-4">Explore</p>
			</a>

			<a href="#contact-section">
				<button class="btn">
					Contact us
				</button>
			</a>

			<RouterLink :to="{ name: 'user-login' }" class="btn">
          <a href="#user-login" class="nav-btn">Log In</a>
      </RouterLink>
			<!-- Links end -->
		</div>
		<!-- Menu content end -->
	</nav>
    <!-- Navbar end -->
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
// import image from '@/assets/4.png'

// const router = useRouter()

const menu = ref(null as any)

const navToggle = () => {
	if (menu.value) {
		let isExpanded = menu.value.getAttribute('aria-expanded');
		menu.value.setAttribute('aria-expanded', !isExpanded);
		menu.value.classList.toggle('hidden');
		menu.value.classList.toggle('flex');
	}
}
</script>

<style scoped>

.menuitem {
	@apply hover:text-slate-300 text-lg
}

</style>