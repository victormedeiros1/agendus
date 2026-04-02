import { AppointmentEvent } from '@/types/appointments'

import { defineStore } from 'pinia'

export const useAppointmentsStore = defineStore('appointments', {
	state: () => ({
		appointments: [] as AppointmentEvent[]
	}),
	actions: {
		addAppointment(appointment: AppointmentEvent): void {
			this.appointments.push(appointment)
		}
	}
})
