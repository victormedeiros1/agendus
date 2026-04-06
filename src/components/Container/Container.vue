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
	padding-left: calc(var(--sidebarDistance));

	@media (max-width: 768px) {
		min-height: 100svh;
	}
}
</style>
