<script setup lang="ts">
import { useAppointmentsStore } from '@/stores/appointments'
import { ServiceType, Service, AppointmentEvent } from '@/types/appointments'
import { IftaLabel, InputText, Select, RadioButton, InputNumber, Button } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const serviceSelectedInitialState: Service = {
	id: null,
	name: '',
	price: 0,
	type: ServiceType.DEFAULT
}

const { addAppointment } = useAppointmentsStore()

const name = ref<string>('')
const serviceType = ref<ServiceType>(ServiceType.DEFAULT)
const services = ref<{
	loaded: Service[]
	selected: Service
}>({
	loaded: [
		{ id: 0, name: 'Cabelo', price: 20, type: ServiceType.DEFAULT },
		{ id: 1, name: 'Barba', price: 30, type: ServiceType.DEFAULT },
		{ id: 2, name: 'Cabelo e Barba', price: 50, type: ServiceType.DEFAULT }
	],
	selected: { ...serviceSelectedInitialState }
})

const typeServiceSelectedIsDefault = computed(
	() => serviceType.value === ServiceType.DEFAULT
)

const handleTypeServiceChange = (): void => {
	const selectFirstService = (): void => {
		services.value.selected = { ...services.value.loaded[0] }
	}

	const resetStateToCustomService = (): void => {
		services.value.selected = {
			...serviceSelectedInitialState,
			type: ServiceType.CUSTOM
		}
	}

	if (typeServiceSelectedIsDefault.value) {
		selectFirstService()
	} else {
		resetStateToCustomService()
	}
}

const salvar = (): void => {
	const payload: AppointmentEvent = {
		start: new Date(),
		end: new Date(),
		client: {
			name: name.value
		},
		service: services.value.selected
	}

	addAppointment(payload)
}

const loadFormInCreateMode = (): void => {
	services.value.selected = services.value.loaded[0]
}

onMounted(() => {
	loadFormInCreateMode()
})
</script>

<template>
	<div class="form">
		<div class="form__section">
			<h4 class="form__subtitle">Cliente</h4>
			<div class="form__group">
				<IftaLabel>
					<InputText id="client" v-model="name" variant="filled" />
					<label for="client">Nome</label>
				</IftaLabel>
			</div>
		</div>
		<div class="form__section">
			<h4 class="form__subtitle">Serviço</h4>
			<div class="form__group form__group--vertical">
				<div class="form__group form__group--radio">
					<RadioButton
						v-model="serviceType"
						inputId="type-default"
						name="default"
						:value="ServiceType.DEFAULT"
						@change="handleTypeServiceChange"
					/>
					<label for="type-default">Padrão</label>
				</div>
				<div class="form__group form__group--radio">
					<RadioButton
						v-model="serviceType"
						inputId="type-custom"
						name="custom"
						:value="ServiceType.CUSTOM"
						@change="handleTypeServiceChange"
					/>
					<label for="type-custom">Customizado</label>
				</div>
			</div>
			<div class="form__group">
				<Select
					v-if="typeServiceSelectedIsDefault"
					v-model="services.selected"
					:options="services.loaded"
					optionLabel="name"
					placeholder="Selecione um serviço"
				/>

				<IftaLabel v-else>
					<InputText
						id="service"
						v-model="services.selected.name"
						variant="filled"
					/>
					<label for="service">Descrição</label>
				</IftaLabel>

				<IftaLabel>
					<InputNumber
						id="price"
						v-model="services.selected.price"
						type="number"
						variant="filled"
					/>
					<label for="price">Preço</label>
				</IftaLabel>
			</div>
		</div>
		<div class="form__footer">
			<Button label="Salvar" severity="success" @click="salvar" />
			<Button label="Cancelar" severity="danger" />
		</div>
	</div>
</template>

<style scoped lang="scss">
label {
	cursor: pointer;
}
</style>
