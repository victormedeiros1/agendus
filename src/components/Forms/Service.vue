<script setup lang="ts">
import { useServicesStore } from '@/stores/services'
import { ServiceType, IRequestService } from '@/types/appointments'
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { InputText, InputNumber, Button, useToast } from 'primevue'
import { v4 as uuidv4 } from 'uuid'
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface ServiceForm {
	id: string
	name: string
	price: number
	type: ServiceType
}

const form = reactive<ServiceForm>({
	id: '',
	name: '',
	price: 0,
	type: ServiceType.DEFAULT
})

const rules = computed(() => ({
	name: { required },
	price: { required, minValue: minValue(0) },
	type: { required }
}))

const v$ = useVuelidate(rules, form)

const { addService, updateService } = useServicesStore()
const route = useRoute()
const toast = useToast()

const salvar = async (): Promise<void> => {
	const isValid = await v$.value.$validate()

	if (!isValid) return

	const payload: IRequestService = {
		id: uuidv4(),
		name: form.name,
		price: form.price,
		type: form.type
	}

	if (editMode.value) {
		updateService(payload)

		toast.add({
			severity: 'success',
			summary: 'Serviço atualizado',
			detail: `Serviço para ${payload.name} atualizado com sucesso!`
		})
	} else {
		addService(payload)

		toast.add({
			severity: 'success',
			summary: 'Serviço criado',
			detail: `Serviço para ${payload.name} criado com sucesso!`
		})
	}
}

const loadService = (id: string): void => {
	const service = useServicesStore().services.find(service => service.id === id)

	if (service) {
		form.id = service.id
		form.name = service.name
		form.price = service.price
		form.type = service.type
	} else {
		toast.add({
			severity: 'error',
			summary: 'Erro',
			detail: 'Serviço não encontrado'
		})
	}
}

const editMode = computed(() => !!route.params.id)

onMounted(() => {
	if (editMode.value) {
		loadService(route.params.id as string)
	}
})
</script>

<template>
	<div class="form">
		<div class="form__section">
			<h3 class="form__subtitle">Serviço</h3>
			<div class="form__group">
				<div class="input__group">
					<label for="name">Nome<span class="required">*</span></label>
					<InputText
						id="name"
						v-model="form.name"
						placeholder="Ex: Ricardo Silva"
						variant="filled"
					/>

					<small v-if="v$.name.$error" class="input-error"
						>Nome obrigatório</small
					>
				</div>

				<div class="input__group">
					<label for="price">Preço<span class="required">*</span></label>
					<InputNumber
						id="price"
						v-model="form.price"
						currency="BRL"
						locale="pt-BR"
						mode="currency"
						variant="filled"
					/>
					<small v-if="v$.price.$error" class="input-error"
						>Preço inválido</small
					>
				</div>
			</div>
		</div>

		<div class="form__footer">
			<Button label="Salvar" severity="success" @click="salvar" />
			<Button label="Cancelar" severity="danger" variant="text" />
		</div>
	</div>
</template>
