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
	min-height: 100svh;
	margin: 0 auto;

	@media (min-width: 768px) {
		padding-left: calc(var(--sidebarDistance));
	}
}
</style>
