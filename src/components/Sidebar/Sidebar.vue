<script setup lang="ts">
import { ref } from 'vue'

import Menu from 'primevue/menu'

const items = ref([
	{
		label: 'Documents',
		items: [
			{
				label: 'New',
				icon: 'pi pi-plus'
			},
			{
				label: 'Search',
				icon: 'pi pi-search'
			}
		]
	},
	{
		label: 'Profile',
		items: [
			{
				label: 'Settings',
				icon: 'pi pi-cog'
			},
			{
				label: 'Logout',
				icon: 'pi pi-sign-out'
			}
		]
	}
])
</script>

<template>
	<Menu :model="items" />
</template>

<style scoped lang="scss"></style>
