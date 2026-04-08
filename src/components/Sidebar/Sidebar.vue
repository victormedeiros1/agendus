<script setup lang="ts">
import Logo from '@/components/Logo/Logo.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const isClosed = ref<boolean>(true)
const sidebarRef = ref<HTMLElement | null>(null)

const toggleMenu = (): void => {
	isClosed.value = !isClosed.value
}

const closeMenu = (): void => {
	isClosed.value = true
}

const isMobile = ref<boolean>(window.innerWidth <= 768)
</script>

<template>
	<!-- Overlay: visível apenas quando sidebar está aberta no mobile -->
	<Transition name="fade">
		<div v-if="isMobile && !isClosed" class="sidebar-overlay" @click="closeMenu" />
	</Transition>

	<nav
		ref="sidebarRef"
		class="sidebar"
		:class="isClosed && isMobile ? 'sidebar--closed' : ''"
	>
		<Button
			v-if="isMobile"
			class="sidebar__toggle"
			:class="isClosed && isMobile ? 'sidebar__toggle--closed' : ''"
			icon="pi pi-chevron-left"
			@click="toggleMenu"
		/>
		<div class="sidebar__header">
			<Logo color="var(--p-primary-0)" :height="150" :width="200" />
		</div>
		<div class="sidebar__body">
			<div class="section">
				<div class="section__title">AGENDAMENTOS</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/appointments">
							<i class="pi pi-objects-column"></i>TODOS
						</router-link>
						<router-link class="section__link" to="/appointments/new">
							<i class="pi pi-th-large"></i>NOVO
						</router-link>
					</div>
				</ul>
			</div>

			<div class="section">
				<div class="section__title">SERVIÇOS</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/services">
							<i class="pi pi-warehouse"></i>TODOS
						</router-link>
					</div>
					<div class="section__item">
						<router-link class="section__link" to="/services/new">
							<i class="pi pi-warehouse"></i>NOVO
						</router-link>
					</div>
				</ul>
			</div>

			<div class="section">
				<div class="section__title">ESTATÍSTICAS</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/faturas">
							<i class="pi pi-chart-bar"></i>FATURAS
						</router-link>
					</div>
				</ul>
			</div>
			<div class="section">
				<div class="section__title">CONFIGURAÇÕES</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/privacidade">
							<i class="pi pi-cog"></i>PRIVACIDADE
						</router-link>
					</div>
				</ul>
			</div>
		</div>
		<div class="sidebar__footer"></div>
	</nav>
</template>

<style scoped lang="scss">
.sidebar-overlay {
	position: fixed;
	inset: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.2);
	cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.sidebar {
	background-color: var(--p-primary-500);
	width: 200px;
	height: 100svh;
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	transition: 0.3s ease;
	padding: var(--p-16) 0;

	&--closed {
		left: -200px;
	}

	&__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: var(--m-16);
		gap: var(--g-8);
	}

	&__link {
		display: flex;
		align-items: center;
		text-decoration: none;
		gap: var(--g-8);
	}

	&__title {
		font-size: var(--fs-24);
		font-weight: 700;
	}

	&__toggle {
		position: absolute;
		top: 50%;
		transform: translateY(-50%, 50%);
		right: -24px;
		background-color: var(--p-primary-500);
		border: 0px solid transparent;
		border-radius: 0;
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: 0.3s ease;

		&--closed {
			right: -32px;
			border-radius: 0;
			border-bottom-left-radius: 50%;
			border-top-left-radius: 50%;
			transform: rotate(180deg);
		}
	}

	.section {
		margin: var(--m-16) 0;

		&__title {
			font-size: var(--fs-12);
			color: var(--p-primary-0);
			font-weight: 500;
			padding: var(--p-8) var(--p-16);
		}

		&__menu {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
		}

		&__item {
			font-size: var(--fs-12);
			font-weight: 500;
		}

		&__link {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: var(--p-primary-0);
			text-decoration: none;
			border: 0px solid transparent;
			transition: 0.1s linear;
			gap: var(--g-8);
			padding: var(--p-16) var(--p-32);

			&:hover {
				border-left: 8px solid var(--p-primary-0);
				background-color: var(--p-primary-600);
			}
		}
	}
}
</style>
