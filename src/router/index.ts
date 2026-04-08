import Appointments from '@/pages/Appointments.vue'
import Faturas from '@/pages/Faturas.vue'
import NewAppointment from '@/pages/NewAppointment.vue'
import NewService from '@/pages/NewService.vue'
import Privacidade from '@/pages/Privacidade.vue'
import Services from '@/pages/Services.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/appointments'
	},
	{
		path: '/appointments',
		name: 'Agendamentos',
		component: Appointments
	},
	{
		path: '/appointments/new',
		name: 'Novo agendamento',
		component: NewAppointment
	},
	{
		path: '/services',
		name: 'Serviços',
		component: Services
	},
	{
		path: '/services/new',
		name: 'Novo serviço',
		component: NewService
	},
	{
		path: '/services/edit/:id',
		name: 'Editar serviço',
		component: NewService
	},
	{
		path: '/faturas',
		name: 'Faturas',
		component: Faturas
	},
	{
		path: '/privacidade',
		name: 'Privacidade',
		component: Privacidade
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes
})
