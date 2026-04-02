<script setup lang="ts">
import Appointment from '@/components/Forms/Appointment.vue'
</script>

<template>
	<section class="new-appointment">
		<h1 class="new-appointment__title">Novo agendamento</h1>

		<Appointment />
	</section>
</template>

<style scoped lang="scss">
.new-appointment {
	width: 100%;
	padding: var(--p-24);

	&__title {
		font-size: var(--fs-24);
		font-weight: 700;
		margin-bottom: var(--m-16);
	}

	&__description {
		color: var(--p-gray-600);
		font-size: var(--fs-14);
	}
}
</style>
