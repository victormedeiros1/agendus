import { VueCalEvent } from 'vue-cal'

export enum ServiceType {
	DEFAULT = 'default',
	CUSTOM = 'custom'
}

export interface Service {
	id: string
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

export interface IRequestAppointment {
	id: string
	client: {
		name: string
	}
	service: Service
	start: Date
	end: Date
}

export interface IRequestService {
	id: string
	name: string
	price: number
	type: ServiceType
}
