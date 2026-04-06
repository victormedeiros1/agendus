<script setup lang="ts">
import { useAppointmentsStore } from '@/stores/appointments'
import { ServiceType, Service, AppointmentEvent } from '@/types/appointments'
import useTime from '@/utils/useTime'
import { toTypedSchema } from '@vee-validate/zod'
import {
	InputText,
	Select,
	RadioButton,
	InputNumber,
	Button,
	DatePicker,
	useToast
} from 'primevue'
import { useForm } from 'vee-validate'
import { computed } from 'vue'

import { appointmentFormSchema } from './schema'

const SERVICES: Service[] = [
	{ id: 0, name: 'Cabelo', price: 20, type: ServiceType.DEFAULT },
	{ id: 1, name: 'Barba', price: 30, type: ServiceType.DEFAULT },
	{ id: 2, name: 'Cabelo e Barba', price: 50, type: ServiceType.DEFAULT }
]

const { defineField, handleSubmit, errors, setFieldValue } = useForm({
	validationSchema: toTypedSchema(appointmentFormSchema),
	initialValues: {
		service: {
			id: SERVICES[0].id,
			name: SERVICES[0].name,
			price: SERVICES[0].price,
			type: ServiceType.DEFAULT
		}
	}
})

const { addAppointment } = useAppointmentsStore()
const { addTimeToDate, addMinutesToDate, formatDateTimeBR } = useTime()
const toast = useToast()

const [name] = defineField('name')
const [startDate] = defineField('startDate')
const [startTime] = defineField('startTime')
const [duration] = defineField('duration')

const [serviceType] = defineField('service.type')
const [serviceId] = defineField('service.id')
const [serviceName] = defineField('service.name')
const [servicePrice] = defineField('service.price')

const typeSelectedIsDefault = computed(() => serviceType.value === ServiceType.DEFAULT)

const selectedService = computed({
	get: () => SERVICES.find(service => service.id === serviceId.value),
	set: (service: Service | null) => {
		if (!service) return
		setFieldValue('service.id', service.id)
		setFieldValue('service.name', service.name)
		setFieldValue('service.price', service.price)
	}
})

const handleTypeServiceChange = (): void => {
	if (typeSelectedIsDefault.value) {
		setFieldValue('service.id', SERVICES[0].id)
		setFieldValue('service.name', SERVICES[0].name)
		setFieldValue('service.price', SERVICES[0].price)
	} else {
		setFieldValue('service.id', null)
		setFieldValue('service.name', '')
		setFieldValue('service.price', 0)
	}
}

const endDate = computed((): Date | null => {
	if (!startDate.value || !startTime.value || !duration.value) return null
	const dateWithHours = addTimeToDate(startDate.value, startTime.value)
	return addMinutesToDate(dateWithHours, duration.value)
})

const salvar = handleSubmit((values): void => {
	const payload: AppointmentEvent = {
		start: addTimeToDate(startDate.value, startTime.value),
		end: endDate.value,
		client: { name: name.value },
		service: {
			id: values.service.id,
			name: values.service.name,
			price: values.service.price,
			type: values.service.type
		}
	}

	addAppointment(payload)
	toast.add({
		severity: 'success',
		summary: 'Agendamento criado',
		detail: `Agendamento para ${payload.client.name} criado com sucesso!`
	})
})
</script>

<template>
	<div class="form">
		<div class="form__section">
			<h3 class="form__subtitle">Cliente</h3>
			<div class="form__group">
				<div class="input__group">
					<label for="name">Nome</label>
					<InputText
						id="name"
						v-model="name"
						placeholder="Ex: Ricardo Silva"
						variant="filled"
					/>
					<small class="input-error">{{ errors.name }}</small>
				</div>
			</div>
		</div>

		<div class="form__section">
			<h3 class="form__subtitle">Serviço</h3>
			<div class="form__group">
				<div class="input__group">
					<label>Selecione o tipo de serviço</label>
					<div class="form__group form__group--radio">
						<RadioButton
							v-model="serviceType"
							inputId="type-default"
							name="serviceType"
							:value="ServiceType.DEFAULT"
							@change="handleTypeServiceChange"
						/>
						<label for="type-default">Padrão</label>
					</div>
					<div class="form__group form__group--radio">
						<RadioButton
							v-model="serviceType"
							inputId="type-custom"
							name="serviceType"
							:value="ServiceType.CUSTOM"
							@change="handleTypeServiceChange"
						/>
						<label for="type-custom">Customizado</label>
					</div>
					<small class="input-error">{{ errors['service.type'] }}</small>
				</div>

				<div v-if="typeSelectedIsDefault" class="input__group">
					<label for="service-select">Opções</label>
					<Select
						id="service-select"
						v-model="selectedService"
						optionLabel="name"
						:options="SERVICES"
						placeholder="Selecione um serviço"
					/>
					<small class="input-error">{{ errors['service.id'] }}</small>
				</div>

				<div v-else class="input__group">
					<label for="service-name">Descrição</label>
					<InputText id="service-name" v-model="serviceName" variant="filled" />
					<small class="input-error">{{ errors['service.name'] }}</small>
				</div>

				<div class="input__group">
					<label for="price">Preço</label>
					<InputNumber
						id="price"
						v-model="servicePrice"
						currency="BRL"
						:disabled="typeSelectedIsDefault"
						locale="pt-BR"
						mode="currency"
						variant="filled"
					/>
					<small class="input-error">{{ errors['service.price'] }}</small>
				</div>
			</div>
		</div>

		<div class="form__section">
			<h3 class="form__subtitle">Data e horário</h3>
			<div class="form__group">
				<div class="input__group">
					<label for="start-date">Data início</label>
					<DatePicker
						v-model="startDate"
						dateFormat="dd.mm.yy"
						inputId="start-date"
						placeholder="Ex: 01.01.2026"
						showIcon
					/>
					<small class="input-error">{{ errors.startDate }}</small>
				</div>

				<div class="input__group">
					<label for="start-time">Hora início</label>
					<DatePicker
						v-model="startTime"
						inputId="start-time"
						placeholder="Ex: 15:30"
						showIcon
						timeOnly
					/>
					<small class="input-error">{{ errors.startTime }}</small>
				</div>

				<div class="input__group">
					<label for="duration">Duração (minutos)</label>
					<InputNumber
						v-model="duration"
						inputId="duration"
						:min="1"
						placeholder="Ex: 30"
						variant="filled"
					/>
					<small class="input-error">{{ errors.duration }}</small>
				</div>

				<div class="input__group">
					<label for="end-time">Data Fim</label>
					<InputText
						id="end-time"
						:disabled="true"
						placeholder="Calculado automaticamente"
						:value="endDate ? formatDateTimeBR(endDate) : ''"
					/>
				</div>
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
