<script lang="ts" setup>
import 'vue-cal/style'

import { useAppointmentsStore } from '@/stores/appointments'
import useTime from '@/utils/useTime'
import { storeToRefs } from 'pinia'
import { VueCal } from 'vue-cal'

const { extractTime } = useTime()

const appointMentsStore = storeToRefs(useAppointmentsStore())
</script>

<template>
	<VueCal :events="appointMentsStore.appointments.value" :time-cell-height="80">
		<template #event="{ event }">
			<div class="appointment">
				<span class="appointment__title">{{ event.client.name }}</span>
				<span class="appointment__service">{{ event.service.name }}</span>
				<span class="appointment__time"
					>{{ extractTime(event.start) }} - {{ extractTime(event.end) }}</span
				>
			</div>
		</template>
	</VueCal>
</template>

<style lang="scss" scoped>
.appointment {
	display: flex;
	flex-direction: column;
	gap: var(--g-4);

	&__title {
		font-size: var(--fs-14);
		font-weight: 600;
	}

	&__service {
		font-size: var(--fs-12);
	}

	&__time {
		font-size: var(--fs-10);
	}
}
</style>

<style lang="scss">
.vuecal {
	width: 100%;
	height: 100%;

	--vuecal-primary-color: var(--p-primary-500);
	--vuecal-secondary-color: var(--p-primary-100);
	// --vuecal-base-color: #ffffff;
	// --vuecal-contrast-color: #000000;
	// --vuecal-border-color: color-mix(in srgb, var(--vuecal-base-color) 8%, transparent);
	// --vuecal-header-color: var(--p-primary-100);
	// --vuecal-event-color: var(--vuecal-base-color);
	// --vuecal-event-border-color: currentColor;
	// --vuecal-border-radius: 6 px;
	// --vuecal-height: 500 px;
	// --vuecal-min-schedule-size: 0 px;
	// --vuecal-time-cell-size: 300px;
	// --vuecal-min-cell-size: 100px;
	// --vuecal-transition-duration: 0.25 s;
	// --vuecal-time-cell-height: 100px;
}
.vuecal--default-theme .vuecal__event {
	background-color: var(--p-primary-500);
	padding: var(--p-8);
}
</style>
