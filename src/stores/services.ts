import { Service } from '@/types/appointments'
import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
	state: () => ({
		services: [] as Service[]
	}),
	actions: {
		addService(service: Service): void {
			this.services.push(service)
		}
	}
})
