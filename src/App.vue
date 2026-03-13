<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
</script>

<template>
	<Container>
		<Sidebar />
		<RouterView />
	</Container>
</template>

<style scoped></style>
