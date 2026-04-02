import { AppointmentEvent, ServiceType } from '@/types/appointments'

export const appointments: AppointmentEvent[] = [
	{
		start: new Date('2026-04-05T06:30:00Z'),
		end: new Date('2026-04-05T07:30:00Z'),
		appointment: {
			client: {
				name: 'João Silva'
			},
			service: {
				id: 0,
				name: 'Cabelo',
				price: 20,
				type: ServiceType.DEFAULT
			}
		}
	},
	{
		start: new Date('2026-04-05T08:30:00Z'),
		end: new Date('2026-04-05T09:30:00Z'),
		appointment: {
			client: {
				name: 'Rogério Santos'
			},
			service: {
				id: 1,
				name: 'Barba',
				price: 30,
				type: ServiceType.DEFAULT
			}
		}
	},
	{
		start: new Date('2026-04-05T14:00:00Z'),
		end: new Date('2026-04-05T15:00:00Z'),
		appointment: {
			client: {
				name: 'Marcelo Carvalho'
			},
			service: {
				id: 2,
				name: 'Cabelo e Barba',
				price: 45,
				type: ServiceType.CUSTOM
			}
		}
	},
	{
		start: new Date('2026-04-05T10:00:00Z'),
		end: new Date('2026-04-05T11:00:00Z'),
		appointment: {
			client: {
				name: 'Carlos Pereira'
			},
			service: {
				id: 3,
				name: 'Cabelo',
				price: 15,
				type: ServiceType.CUSTOM
			}
		}
	}
]
