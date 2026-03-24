<script setup lang="ts">
import { Button } from 'primevue'

import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
	<nav class="sidebar">
		<div class="sidebar__header">
			<img width="128px" src="/logo.svg" />
			<Button icon="pi pi-plus" iconPos="left" label="NOVO AGENDAMENTO" />
		</div>
		<div class="sidebar__body">
			<div class="section">
				<div class="section__titulo">AGENDA</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/">
							<i class="pi pi-book"></i>Agendamentos
						</router-link>
					</div>
				</ul>
			</div>
			<div class="section">
				<div class="section__titulo">ESTATÍSTICAS</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/faturas">
							<i class="pi pi-chart-bar"></i>Faturas
						</router-link>
					</div>
				</ul>
			</div>
			<div class="section">
				<div class="section__titulo">CONFIGURAÇÕES</div>
				<ul class="section__menu">
					<div class="section__item">
						<router-link class="section__link" to="/privacidade">
							<i class="pi pi-cog"></i>Privacidade
						</router-link>
					</div>
				</ul>
			</div>
		</div>
		<div class="sidebar__footer"></div>
	</nav>
</template>

<style scoped lang="scss">
.sidebar {
	width: 200;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	gap: var(--g-8);
	box-shadow: 0 0 10px 0 var(--p-gray-200);
	padding: var(--p-16);

	&__header {
		display: flex;
		flex-direction: column;
		align-items: center;
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

	.section {
		margin-top: var(--m-16);
		margin-bottom: var(--m-28);

		&__titulo {
			font-size: var(--fs-12);
			color: var(--p-gray-500);
			font-weight: 500;
			padding: var(--p-8);
		}

		&__menu {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
		}

		&__item {
			font-size: var(--fs-14);
			font-weight: 500;
		}

		&__link {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: var(--p-gray-500);
			text-decoration: none;
			gap: var(--g-8);
			padding: var(--p-14);

			&:hover {
				background-color: var(--p-gray-50);
			}
		}
	}
}
</style>
