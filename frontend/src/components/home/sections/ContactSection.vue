<template>
    <!-- Contact section start -->
	<section id="contact-section" class="px-12 lg:px-72 pt-44 pb-32 relative bg-slate-300">
        <!-- Main text start -->
		<h1 class="uppercase text-5xl mb-4 font-semibold text-primary">
			Contact us
		</h1>
		<!-- Main text end -->

        <!-- Form start -->
        <div class="w-full flex justify-center">
            <!-- <div class="hidden md:flex justify-center items-center bg-green-400">
            </div> -->
            <div class="flex flex-col md:grid md:grid-cols-2 w-full items-center gap-x-4">
                <div class="flex flex-col w-full">
                    <label for="contact-company" class="text-stone-500 text-left">Company Name</label>
                    <input type="email" name="contact-company" id="contact-company" class="bg-stone-200 py-2 px-4 w-full mb-6">
                </div>

                <div class="flex flex-col w-full">
                    <label for="contact-name" class="text-stone-500 text-left">Your Name</label>
                    <input type="email" name="contact-name" id="contact-name" class="bg-stone-200 py-2 px-4 w-full mb-6">
                </div>

                <div class="flex flex-col w-full">
                    <label for="contact-phone" class="text-stone-500 text-left">Phone Number</label>
                    <input type="email" name="contact-phone" id="contact-phone" class="bg-stone-200 py-2 px-4 w-full mb-6">
                </div>

                <div class="flex flex-col w-full">
                    <label for="contact-email" class="text-stone-500 text-left">E-mail address</label>
                    <input type="email" name="contact-email" id="contact-company" class="bg-stone-200 py-2 px-4 w-full mb-6">
                </div>


                <div class="md:col-span-2 flex flex-col w-full">
                    <label for="user_message" class="text-stone-500 text-left">Message</label>
                    <textarea name="user_message" id="user_message" cols="30" rows="6" class="bg-stone-200 py-2 px-4 w-full mb-6"></textarea>
                </div>

                <button class="btn w-full md:w-1/2">Send</button>
            </div>
        </div>
        <!-- Form end -->

        <!-- Circle start -->
        <div class="bg-neutral-200 h-44 w-44 md:h-52 md:w-52 rounded-full absolute -top-20 left-0 mt-16 -z-20"></div>
        <!-- Circle end -->
	</section>
	<!-- Contact section end -->
</template>

<script lang="ts" setup>
</script>

<style>

</style>