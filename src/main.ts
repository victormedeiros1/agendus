import { createApp } from 'vue'

import '@/styles/main.css'

import App from './App.vue'

import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css'

import { router } from './router'
import { Agendus } from './theme'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
	theme: {
		preset: Agendus,
		options: {
			darkModeSelector: '.theme'
		}
	}
})

app.mount('#app')
