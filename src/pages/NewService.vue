<script setup lang="ts">
import Service from '@/components/Forms/Service.vue'
</script>

<template>
	<section class="new-service">
		<h1 class="new-service__title">Novo serviço</h1>

		<Service />
	</section>
</template>

<style scoped lang="scss">
.new-service {
	width: 100%;
	padding: var(--p-24);

	&__title {
		font-size: var(--fs-24);
		font-weight: 700;
		margin-bottom: var(--m-16);
	}
}
</style>
