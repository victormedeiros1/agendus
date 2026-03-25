import { VueCalEvent } from 'vue-cal'

export interface Appointment extends VueCalEvent {
	detalhes: {
		cliente: {
			nome: string
			telefone: string
		}
		servico: string
	}
}

export const appointments: Appointment[] = [
	{
		start: new Date('2026-03-24T06:30:00Z'),
		end: new Date('2026-03-24T07:30:00Z'),
		detalhes: {
			cliente: {
				nome: 'João Silva',
				telefone: '(11) 98765-4321'
			},
			servico: 'Cabelo'
		}
	},
	{
		start: new Date('2026-03-25T14:00:00Z'),
		end: new Date('2026-03-25T15:00:00Z'),
		detalhes: {
			cliente: {
				nome: 'Roberto',
				telefone: '(21) 91234-5678'
			},
			servico: 'Barba'
		}
	},
	{
		start: new Date('2026-03-26T10:00:00Z'),
		end: new Date('2026-03-26T11:00:00Z'),
		detalhes: {
			cliente: {
				nome: 'William',
				telefone: '(31) 99876-5432'
			},
			servico: 'Cabelo e Barba'
		}
	}
]
