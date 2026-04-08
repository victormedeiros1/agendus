<script setup lang="ts">
import { useServicesStore } from '@/stores/services'
import { ServiceType, IRequestService } from '@/types/appointments'
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { InputText, InputNumber, Button, useToast } from 'primevue'
import { v4 as uuidv4 } from 'uuid'
import { reactive, computed } from 'vue'

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

const { addService } = useServicesStore()
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

	addService(payload)

	toast.add({
		severity: 'success',
		summary: 'Serviço criado',
		detail: `Serviço para ${payload.name} criado com sucesso!`
	})
}
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
			<Button label="Cancelar" severity="danger" />
		</div>
	</div>
</template>
