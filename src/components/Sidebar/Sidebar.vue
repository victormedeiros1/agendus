<template>
	<nav class="sidebar">
		<div class="sidebar__header">
			<img width="128px" src="/logo.svg" />
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
.sidebar {
	width: 200px;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 10px 0 var(--p-gray-200);
	padding: var(--p-16) 0;

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

	.section {
		margin: var(--m-16) 0;

		&__title {
			font-size: var(--fs-12);
			color: var(--p-gray-500);
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
			color: var(--p-gray-500);
			text-decoration: none;
			border: 0px solid transparent;
			transition: 0.1s linear;
			gap: var(--g-8);
			padding: var(--p-16) var(--p-32);

			&:hover {
				border-left: 8px solid var(--p-gray-500);
				background-color: var(--p-primary-100);
			}
		}
	}
}
</style>
