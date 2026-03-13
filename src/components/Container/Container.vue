<script setup lang="ts"></script>

<template>
	<div class="container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.container {
	position: relative;
	display: flex;
	width: 100%;
	max-width: 1040px;
	min-height: 100vh;
	margin: 0 auto;
	padding: var(--p-64);
	padding-top: var(--p-112);

	@media (max-width: 768px) {
		min-height: 100svh;
		padding: var(--p-20);
		padding-top: var(--p-96);
	}
}
</style>
