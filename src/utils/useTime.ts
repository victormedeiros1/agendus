export default function useTime() {
	const extrairHorario = (data: Date) => {
		const horas = data.getHours().toString().padStart(2, '0')
		const minutos = data.getMinutes().toString().padStart(2, '0')
		return `${horas}:${minutos}`
	}

	const extrairData = (data: Date) => {
		const dia = data.getDate().toString().padStart(2, '0')
		const mes = (data.getMonth() + 1).toString().padStart(2, '0')
		const ano = data.getFullYear()
		return `${dia}/${mes}/${ano}`
	}

	return {
		extrairHorario,
		extrairData
	}
}
