<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import { Toast } from 'primevue'
</script>

<template>
	<Container>
		<Toast />
		<Sidebar />
		<RouterView />
	</Container>
</template>

<style scoped></style>
