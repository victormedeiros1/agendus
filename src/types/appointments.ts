import { VueCalEvent } from 'vue-cal'

export enum ServiceType {
	DEFAULT = 'default',
	CUSTOM = 'custom'
}

export interface Service {
	id: number | null
	name: string
	price: number
	type: ServiceType
}

interface Appointment {
	client: {
		name: string
	}
	service: Service
}

export interface AppointmentEvent extends VueCalEvent, Appointment {}
