import Agendamentos from '@/pages/Agendamentos.vue'
import Faturas from '@/pages/Faturas.vue'
import Privacidade from '@/pages/Privacidade.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Agendamentos',
		component: Agendamentos
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
