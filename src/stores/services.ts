import { Service } from '@/types/appointments'
import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
	state: () => ({
		services: [] as Service[]
	}),
	actions: {
		addService(service: Service): void {
			this.services.push(service)
		},
		updateService(service: Service): void {
			const index = this.services.findIndex(service => service.id === service.id)
			if (index !== -1) {
				this.services[index] = service
			}
		}
	}
})
