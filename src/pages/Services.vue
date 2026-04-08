<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue'
import { useServicesStore } from '@/stores/services'
import { ServiceType } from '@/types/appointments'
import { storeToRefs } from 'pinia'
import { Button, useToast } from 'primevue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { services } = storeToRefs(useServicesStore())
const { deleteService } = useServicesStore()

const toast = useToast()
const router = useRouter()

const isOpen = ref<boolean>(false)
const serviceToDelete = ref<string>('')

const handleModalVisibility = (): void => {
	isOpen.value = !isOpen.value
}

const convertTypeToText = (type: ServiceType): string => {
	if (type === ServiceType.DEFAULT) return 'Padrão'

	return 'Personalizado'
}

const openModal = (id: string): void => {
	serviceToDelete.value = id
	handleModalVisibility()
}

const handleEdit = (id: string): void => {
	router.push({
		name: 'Editar serviço',
		params: { id }
	})
}

const handleCreate = (): void => {
	router.push({
		name: 'Novo serviço'
	})
}

const handleDelete = (): void => {
	deleteService(serviceToDelete.value)

	toast.add({
		severity: 'success',
		summary: 'Sucesso',
		detail: 'Serviço excluído com sucesso!',
		life: 5000
	})
}

const haveServices = computed(() => services.value.length > 0)
const servicesCount = computed(() => services.value.length)
</script>

<template>
	<div class="services">
		<div class="services__header">
			<div class="services__texts">
				<h1 class="services__title">Serviços</h1>
				<p class="services__subtitle">
					Gerencie os serviços cadastrados para agendamento.
				</p>
			</div>
			<p v-if="haveServices" class="services__count">
				{{ servicesCount }} cadastrados
			</p>
		</div>

		<div v-if="haveServices" class="services__list">
			<div v-for="service in services" :key="service.id" class="service-card">
				<div class="service-card__header">
					<h2 class="service-card__name">{{ service.name }}</h2>
					<div class="service-card__actions">
						<Button
							icon="pi pi-pencil"
							severity="primary"
							size="small"
							variant="text"
							@click="handleEdit(service.id)"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							size="small"
							variant="text"
							@click="openModal(service.id)"
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

		<div v-else class="services__empty-list">
			<Button class="services__add-service" variant="text" @click="handleCreate">
				<div aria-hidden="true" class="services__empty-icon">
					<i class="pi pi-briefcase"></i>
				</div>
				<h3 class="services__empty-title">Nenhum serviço encontrado</h3>
				<p class="services__empty-description">
					Clique aqui para criar seu primeiro serviço!
				</p>
			</Button>
		</div>

		<Modal
			body-text="Tem certeza de que deseja excluir este serviço?"
			cancel-button-text="Cancelar"
			:confirm-action="() => handleDelete()"
			confirm-button-text="Confirmar"
			header-text="Confirmar exclusão"
			:is-open="isOpen"
			@close="handleModalVisibility"
		/>
	</div>
</template>

<style scoped lang="scss">
.services {
	width: 100%;
	padding: var(--p-16);
	display: flex;
	flex-direction: column;
	gap: var(--g-16);

	@media (min-width: 768px) {
		padding: var(--p-24);
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: var(--g-16);
		padding: var(--p-16);
		border-radius: 16px;
		border: 1px solid var(--p-gray-200);
	}

	&__title {
		font-size: var(--fs-32);
		line-height: var(--lh-32);
		font-weight: 700;
		color: var(--p-gray-700);
		margin-bottom: var(--m-8);
	}

	&__subtitle {
		font-size: var(--fs-14);
		line-height: var(--lh-20);
		color: var(--p-gray-500);
		max-width: 52ch;
	}

	&__count {
		padding: var(--p-8) var(--p-12);
		border-radius: 999px;
		font-size: var(--fs-12);
		line-height: var(--lh-16);
		font-weight: 700;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: var(--p-primary-700);
		background-color: var(--p-primary-100);
	}

	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--g-16);
	}

	&__add-service {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: var(--g-10);
		min-height: 280px;
		padding: var(--p-24);
		border-radius: 16px;
		border: 1px dashed var(--p-primary-400);
	}

	&__empty-icon {
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background-color: var(--p-primary-100);
		color: var(--p-primary-600);
		font-size: var(--fs-24);
	}

	&__empty-title {
		font-size: var(--fs-24);
		line-height: var(--lh-24);
		color: var(--p-gray-700);
	}

	&__empty-description {
		font-size: var(--fs-14);
		line-height: var(--lh-20);
		color: var(--p-gray-500);
		max-width: 40ch;
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
