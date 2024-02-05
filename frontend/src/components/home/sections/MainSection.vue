<template>
    <!-- Main section start -->
	<section class="lg:h-screen px-12 lg:px-72 py-32" :class="showArrow ? 'section' : ''">
		<div class="w-full h-full flex flex-col md:justify-center">
			<!-- Main text start -->
			<!-- <div class="bg-slate-900 p-6 bg-opacity-90 rounded-lg hover:bg-opacity-100 transition	ease-in-out"> -->
			<div class="">
				<h1 class="uppercase text-2xl lg:text-5xl xl:text-7xl mb-4 font-semibold text-primary">
					Empowering Your Events
				</h1>
				<p class="capitalize w-full text-stone-700 text-lg">
					Pack Them In specializes in curating vibrant and responsive audiences for your events.
					With our expert team and innovative strategies, we ensure a packed house,
					providing advisors and organizers with the ideal platform to connect,
					share insights, and make a lasting impact. Elevate your events with Pack Them In and transform gatherings into unforgettable experiences.
				</p>
				<!-- Main text end -->

				<!-- Social links start -->
				<div class="flex mt-4 gap-8 text-stone-700">
					<a href="#">
						<i class="pi pi-instagram socialIcon" style="font-size: 2rem"></i>
					</a>
					<a href="#">
						<i class="pi pi-linkedin socialIcon" style="font-size: 2rem"></i>
					</a>
					<a href="#">
						<i class="pi pi-facebook socialIcon" style="font-size: 2rem"></i>
					</a>
				</div>
				<!-- Social links end -->
			</div>

			</div>

		<!-- Photographer image start -->
		<!-- <div class="absolute bottom-0 right-0 overflow-hidden h-2/5 sm:h-1/2 md:h-3/5 lg:h-4/6 -z-50"> -->
			<div class="absolute right-0 top-0 -z-50 w-screen">
    		<img :src="image" alt="img" class="min-w-full min-h-screen object-cover">
			</div>

		<!-- Photographer image end -->

		<!-- "More" button start -->
		<!-- <div class="w-full h-20 flex justify-start md:justify-center items-center">
			<a href="#about-section">
				<i class="fa-solid fa-arrow-down transition text-stone-100 text-xl bg-stone-700 rounded-full shadow p-4 hover:-translate-y-2 hover:shadow-xl"></i>
			</a>
		</div> -->
		<!-- "More" button end -->

	</section>
	<!-- Main section end -->
</template>

<script lang="ts" setup>
import image from '@/assets/herobg.webp'
import { onMounted, ref } from 'vue';

const showArrow = ref(false)

onMounted(() => {
	const timeoutId = setTimeout(() => {
		showArrow.value = true
	}, 3000)

	window.onscroll = () => {

		clearTimeout(timeoutId)
		setTimeout(() => {
			showArrow.value = false
		}, 500)
	}
})

</script>

<style scoped>

.socialIcon {
	@apply hover:text-primary transition ease-in-out
}

.section {
  /* height: 100vh;
  position: relative;
  width: 100%; */
	@apply h-full lg:h-screen relative w-full
}

.section::before {
  animation: bounce 1s ease infinite;
  bottom: 2rem;
  /* color: #fff; */
  content: '╲╱';
  font-size: 2rem;
  height: 4rem;
  left: 50%;
  letter-spacing: -1px;
  line-height: 4rem;
  margin-left: -3rem;
  opacity: 0.8;
  position: absolute;
  text-align: center;
  width: 6rem;
	@apply text-primary
}

@keyframes bounce {
  50% {
    transform: translateY(-50%);
  }
}

</style>