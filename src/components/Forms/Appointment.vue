<script setup lang="ts">
import { useAppointmentsStore } from '@/stores/appointments'
import { useServicesStore } from '@/stores/services'
import { ServiceType, Service, IRequestAppointment } from '@/types/appointments'
import useTime from '@/utils/useTime'
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import {
	InputText,
	Select,
	RadioButton,
	InputNumber,
	Button,
	DatePicker,
	useToast
} from 'primevue'
import { v4 as uuidv4 } from 'uuid'
import { reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface AppointmentForm {
	id: string
	start: Date
	end: Date
	client: {
		name: string
	}
	startTime: Date
	duration: number
	service: {
		id: string
		name: string
		price: number
		type: ServiceType
	}
}

const { addAppointment } = useAppointmentsStore()
const { services } = useServicesStore()

const form = reactive<AppointmentForm>({
	id: '',
	client: {
		name: ''
	},
	start: new Date(),
	end: new Date(),
	startTime: new Date(),
	duration: 30,
	service: {
		id: '',
		name: '',
		price: 0,
		type: ServiceType.DEFAULT
	}
})

const rules = computed(() => ({
	client: {
		name: { required }
	},
	start: { required },
	startTime: { required },
	duration: { required, minValue: minValue(1) },
	service: {
		type: { required },
		id: { required },
		name: { required },
		price: { required }
	}
}))

const errors = computed(() => {
	const client = v$.value.client
	const service = v$.value.service

	return {
		clientName: (client && client.name?.$error) || false,
		serviceType: (service && service.type?.$error) || false,
		serviceId: (service && service.id?.$error) || false,
		serviceName: (service && service.name?.$error) || false,
		servicePrice: (service && service.price?.$error) || false,
		start: v$.value.start?.$error ?? false,
		startTime: v$.value.startTime?.$error ?? false,
		duration: v$.value.duration?.$error ?? false
	}
})

const v$ = useVuelidate(rules, form)

const { addTimeToDate, addMinutesToDate, formatDateTimeBR } = useTime()
const toast = useToast()
const router = useRouter()

const typeSelectedIsDefault = computed(
	(): boolean => form.service.type === ServiceType.DEFAULT
)

const selectedService = computed({
	get: () => services.find(s => s.id === form.service.id),
	set: (service: Service | null) => {
		if (!service) return
		form.service.id = service.id
		form.service.name = service.name
		form.service.price = service.price
	}
})

const handleTypeServiceChange = (): void => {
	if (typeSelectedIsDefault.value) {
		Object.assign(form.service, services[0])
	} else {
		form.service.id = ''
		form.service.name = ''
		form.service.price = 0
	}
}

const endDate = computed((): Date => {
	const dateWithHours = addTimeToDate(form.start, form.startTime)
	return addMinutesToDate(dateWithHours, form.duration)
})

const salvar = async (): Promise<void> => {
	const isValid = await v$.value.$validate()

	if (!isValid) return

	const payload: IRequestAppointment = {
		id: uuidv4(),
		start: addTimeToDate(form.start, form.startTime),
		end: endDate.value,
		client: { name: form.client.name },
		service: { ...form.service }
	}

	addAppointment(payload)

	toast.add({
		severity: 'success',
		summary: 'Agendamento criado',
		detail: `Agendamento para ${payload.client.name} criado com sucesso!`,
		life: 5000
	})
}

const haveServices = computed(() => services.length > 0)

onMounted(() => {
	if (haveServices.value) {
		form.service = services[0]
		form.service = { ...services[0], type: ServiceType.DEFAULT }
	} else {
		form.service.type = ServiceType.CUSTOM
	}
})
</script>

<template>
	<div class="form">
		<div class="form__section">
			<h3 class="form__subtitle">Cliente</h3>
			<div class="form__group">
				<div class="input__group">
					<label for="name">Nome<span class="required">*</span></label>
					<InputText
						id="name"
						v-model="form.client.name"
						placeholder="Ex: Ricardo Silva"
						variant="filled"
					/>

					<small v-if="errors.clientName" class="input-error"
						>Nome obrigatório</small
					>
				</div>
			</div>
		</div>

		<div class="form__section">
			<h3 class="form__subtitle">Serviço</h3>
			<div class="form__group">
				<div class="input__group">
					<label
						>Selecione o tipo de serviço<span class="required">*</span></label
					>
					<div class="form__group form__group--radio">
						<RadioButton
							v-model="form.service.type"
							:disabled="!haveServices"
							inputId="type-default"
							name="serviceType"
							:value="ServiceType.DEFAULT"
							@change="handleTypeServiceChange"
						/>
						<label for="type-default">Padrão</label>
						<i
							v-if="!haveServices"
							v-tooltip.top="
								'Não há serviços cadastrados. Adicione um novo serviço para habilitar esta opção.'
							"
							class="pi pi-info-circle"
							style="color: var(--p-primary-500)"
						></i>
					</div>
					<div class="form__group form__group--radio">
						<RadioButton
							v-model="form.service.type"
							inputId="type-custom"
							name="serviceType"
							:value="ServiceType.CUSTOM"
							@change="handleTypeServiceChange"
						/>
						<label for="type-custom">Customizado</label>
					</div>
					<small v-if="errors.serviceType" class="input-error"
						>Tipo de serviço obrigatório</small
					>
				</div>

				<div v-if="typeSelectedIsDefault && haveServices" class="input__group">
					<label for="service-select"
						>Opções<span class="required">*</span></label
					>
					<Select
						id="service-select"
						v-model="selectedService"
						optionLabel="name"
						:options="services"
						placeholder="Selecione um serviço"
					/>
					<small v-if="errors.serviceId" class="input-error"
						>Serviço obrigatório</small
					>
					<Button
						icon="pi pi-plus"
						label="NOVO SERVIÇO"
						@click="router.push('/services/new')"
					/>
				</div>

				<div v-else class="input__group">
					<label for="service-name"
						>Descrição<span class="required">*</span></label
					>
					<InputText
						id="service-name"
						v-model="form.service.name"
						variant="filled"
					/>
					<small v-if="errors.serviceName" class="input-error"
						>Descrição obrigatória</small
					>
				</div>

				<div class="input__group">
					<label for="price">Preço<span class="required">*</span></label>
					<InputNumber
						id="price"
						v-model="form.service.price"
						currency="BRL"
						:disabled="typeSelectedIsDefault"
						locale="pt-BR"
						mode="currency"
						variant="filled"
					/>
					<small v-if="errors.servicePrice" class="input-error"
						>Preço inválido</small
					>
				</div>
			</div>
		</div>

		<div class="form__section">
			<h3 class="form__subtitle">Data e horário</h3>
			<div class="form__group">
				<div class="input__group">
					<label for="start-date"
						>Data início<span class="required">*</span></label
					>
					<DatePicker
						v-model="form.start"
						dateFormat="dd.mm.yy"
						inputId="start-date"
						placeholder="Ex: 01.01.2026"
						showIcon
					/>
					<small v-if="errors.start" class="input-error"
						>Data início inválida</small
					>
				</div>

				<div class="input__group">
					<label for="start-time"
						>Hora início<span class="required">*</span></label
					>
					<DatePicker
						v-model="form.startTime"
						inputId="start-time"
						placeholder="Ex: 15:30"
						showIcon
						timeOnly
					/>
					<small v-if="errors.startTime" class="input-error"
						>Hora início inválida</small
					>
				</div>

				<div class="input__group">
					<label for="duration"
						>Duração (minutos)<span class="required">*</span></label
					>
					<InputNumber
						v-model="form.duration"
						inputId="duration"
						:min="1"
						placeholder="Ex: 30"
						variant="filled"
					/>
					<small v-if="errors.duration" class="input-error"
						>Duração inválida</small
					>
				</div>

				<div class="input__group">
					<label for="end-time">Data Fim<span class="required">*</span></label>
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
			<Button label="Cancelar" severity="danger" variant="text" />
		</div>
	</div>
</template>
