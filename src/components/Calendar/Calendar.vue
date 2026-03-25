<script lang="ts" setup>
import { VueCal } from 'vue-cal'
import 'vue-cal/style'

import { appointments } from '@/services/mocks/appointments'
</script>

<template>
	<VueCal :events="appointments">
		<template #event="{ event }">
			<div class="event-content">
				<h3>{{ event.detalhes.cliente.nome }}</h3>
				<p>{{ event.detalhes.servico }}</p>
			</div>
		</template>
	</VueCal>
</template>

<style lang="scss" scoped></style>
