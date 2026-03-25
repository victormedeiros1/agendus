<script setup lang="ts"></script>

<template>
	<div class="container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.container {
	--sidebarDistance: 200px;

	position: relative;
	display: flex;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	padding: var(--p-64) var(--p-64) var(--p-64)
		calc(var(--sidebarDistance) + var(--p-64));

	@media (max-width: 768px) {
		min-height: 100svh;
		padding: var(--p-20);
		padding-top: var(--p-96);
	}
}
</style>
