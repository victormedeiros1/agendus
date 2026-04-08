<script setup lang="ts">
import { Button, Dialog } from 'primevue'

const props = defineProps<{
	isOpen: boolean
	headerText: string
	bodyText: string
	confirmButtonText: string
	cancelButtonText: string
	confirmAction: () => void
}>()

const emit = defineEmits<{
	(event: 'close'): void
}>()

const handleConfirmAction = (): void => {
	props.confirmAction()
	emit('close')
}

const handleCancelAction = (): void => {
	emit('close')
}
</script>

<template>
	<Dialog
		class="modal"
		:header="headerText"
		modal
		:style="{ width: '100%', maxWidth: '600px' }"
		:visible="isOpen"
	>
		<div class="modal__body">
			<p class="modal__text">{{ bodyText }}</p>
		</div>
		<div class="modal__footer">
			<Button label="Confirmar" severity="success" @click="handleConfirmAction" />
			<Button
				label="Cancelar"
				severity="danger"
				variant="text"
				@click="handleCancelAction"
			/>
		</div>
	</Dialog>
</template>

<style scoped lang="scss">
.modal {
	&__footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--m-8);
		margin-top: var(--m-32);
	}
}
</style>
