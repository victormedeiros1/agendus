<script setup lang="ts">
import { computed, ref } from 'vue'

import { IftaLabel, InputText, Select, RadioButton, InputNumber, Button } from 'primevue'

const services = [
	{ id: 0, name: 'Cabelo', price: 20 },
	{ id: 1, name: 'Barba', price: 30 },
	{ id: 2, name: 'Cabelo e Barba', price: 50 }
]

const form = ref({
	client: {
		name: ''
	},
	service: {
		type: 'default',
		selected: services[0]
	}
})

const typeServiceSelectedIsDefault = computed(() => form.value.service.type === 'default')

const getServicePrice = () => {
	if (typeServiceSelectedIsDefault.value) {
		form.value.service.selected = services[0]
	} else {
		form.value.service.selected = {
			id: 1000000,
			name: '',
			price: 0
		}
	}
}
</script>

<template>
	<div class="form">
		<div class="form__section">
			<h4 class="form__subtitle">Cliente</h4>
			<div class="form__group">
				<IftaLabel>
					<InputText v-model="form.client.name" id="client" variant="filled" />
					<label for="client">Nome</label>
				</IftaLabel>
			</div>
		</div>
		<div class="form__section">
			<h4 class="form__subtitle">Serviço</h4>
			<div class="form__group form__group--vertical">
				<div class="form__group form__group--radio">
					<RadioButton
						v-model="form.service.type"
						@change="getServicePrice"
						inputId="type-default"
						name="default"
						value="default"
					/>
					<label for="type-default">Padrão</label>
				</div>
				<div class="form__group form__group--radio">
					<RadioButton
						v-model="form.service.type"
						@change="getServicePrice"
						inputId="type-custom"
						name="custom"
						value="custom"
					/>
					<label for="type-custom">Customizado</label>
				</div>
			</div>
			<div class="form__group">
				<Select
					v-if="typeServiceSelectedIsDefault"
					v-model="form.service.selected"
					:options="services"
					optionLabel="name"
					placeholder="Selecione um serviço"
				/>

				<IftaLabel v-else>
					<InputText
						v-model="form.service.selected.name"
						id="service"
						variant="filled"
					/>
					<label for="service">Descrição</label>
				</IftaLabel>

				<IftaLabel>
					<InputNumber
						v-model="form.service.selected.price"
						id="price"
						type="number"
						variant="filled"
					/>
					<label for="price">Preço</label>
				</IftaLabel>
			</div>
		</div>
		<div class="form__footer">
			<Button label="Salvar" severity="success" />
			<Button label="Cancelar" severity="danger" />
		</div>
	</div>
</template>

<style scoped lang="scss">
label {
	cursor: pointer;
}
</style>
