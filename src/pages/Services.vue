<script setup lang="ts">
import { useServicesStore } from '@/stores/services'
import { ServiceType } from '@/types/appointments'
import { Button } from 'primevue'

const { services } = useServicesStore()

const convertTypeToText = (type: ServiceType): string => {
	if (type === ServiceType.DEFAULT) return 'Padrão'

	return 'Personalizado'
}
</script>

<template>
	<div class="services">
		<h1 class="services__title">Serviços</h1>
		<p class="services__subtitle">
			Gerencie os serviços cadastrados para agendamento.
		</p>

		<div v-if="services.length > 0" class="services__list">
			<div v-for="service in services" :key="service.id" class="service-card">
				<div class="service-card__header">
					<h2 class="service-card__name">{{ service.name }}</h2>
					<div class="service-card__actions">
						<Button
							icon="pi pi-pencil"
							severity="primary"
							size="small"
							variant="text"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							size="small"
							variant="text"
						/>
					</div>
				</div>

				<div class="service-card__meta">
					<p class="service-card__label">Preço</p>
					<p class="service-card__value">R$ {{ service.price.toFixed(2) }}</p>
				</div>

				<div class="service-card__meta">
					<p class="service-card__label">Tipo</p>
					<p class="service-card__tag">{{ convertTypeToText(service.type) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.services {
	width: 100%;
	padding: var(--p-24);
	display: flex;
	flex-direction: column;
	gap: var(--g-16);

	&__title {
		font-size: var(--fs-32);
		line-height: var(--lh-32);
		font-weight: 700;
		color: var(--p-gray-700);
	}

	&__subtitle {
		font-size: var(--fs-14);
		line-height: var(--lh-20);
		color: var(--p-gray-500);
	}

	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: var(--g-16);
	}
}

.service-card {
	background: var(--p-gray-0);
	border: 1px solid var(--p-gray-200);
	border-radius: 14px;
	padding: var(--p-16);
	display: flex;
	flex-direction: column;
	gap: var(--g-14);
	box-shadow: 0 4px 20px rgba(30, 41, 59, 0.06);

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__actions {
		display: flex;
		gap: var(--g-8);
	}

	&__name {
		font-size: var(--fs-20);
		line-height: var(--lh-24);
		font-weight: 700;
		color: var(--p-gray-700);
	}

	&__meta {
		display: flex;
		flex-direction: column;
		gap: var(--g-4);
	}

	&__label {
		font-size: var(--fs-12);
		line-height: var(--lh-16);
		color: var(--p-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	&__value {
		font-size: var(--fs-18);
		line-height: var(--lh-20);
		font-weight: 700;
		color: var(--p-primary-600);
	}

	&__tag {
		width: fit-content;
		padding: var(--p-4) var(--p-10);
		border-radius: 999px;
		background: var(--p-primary-100);
		color: var(--p-primary-700);
		font-size: var(--fs-12);
		line-height: var(--lh-16);
		font-weight: 600;
	}
}
</style>
