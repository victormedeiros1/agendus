import { ServiceType } from '@/types/appointments'
import { z } from 'zod'

const baseServiceSchema = z.object({
	price: z
		.number({ required_error: 'O preço é obrigatório' })
		.min(0, 'O preço deve ser um número positivo'),
	type: z.nativeEnum(ServiceType, {
		message: 'O tipo de serviço é obrigatório'
	})
})

const serviceSchema = z.discriminatedUnion('type', [
	baseServiceSchema.extend({
		type: z.literal(ServiceType.DEFAULT),
		id: z.number({ required_error: 'Selecione um serviço' }),
		name: z.string().optional()
	}),
	baseServiceSchema.extend({
		type: z.literal(ServiceType.CUSTOM),
		id: z.null().optional(),
		name: z.string().min(1, 'A descrição do serviço é obrigatória')
	})
])

export const appointmentFormSchema = z.object({
	name: z
		.string({ required_error: 'O nome é obrigatório' })
		.min(1, 'O nome é obrigatório'),
	service: serviceSchema,
	startDate: z.date({ required_error: 'A data de início é obrigatória' }),
	startTime: z.date({ required_error: 'A hora de início é obrigatória' }),
	duration: z
		.number({ required_error: 'A duração é obrigatória' })
		.min(1, 'A duração deve ser maior que zero')
})
