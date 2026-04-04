interface useTimeReturn {
	extrairHorario: (data: Date) => string
	extrairData: (data: Date) => string
	juntarDataComHoras: (data: Date, horas: Date) => Date
	somarTempoAData: (data: Date, horas: number) => Date
	formatarDataParaBR: (date: Date | null) => string
}

export default function useTime(): useTimeReturn {
	const extrairHorario = (data: Date): string => {
		const horas = data.getHours().toString().padStart(2, '0')
		const minutos = data.getMinutes().toString().padStart(2, '0')
		return `${horas}:${minutos}`
	}

	const extrairData = (data: Date): string => {
		const dia = data.getDate().toString().padStart(2, '0')
		const mes = (data.getMonth() + 1).toString().padStart(2, '0')
		const ano = data.getFullYear()
		return `${dia}/${mes}/${ano}`
	}

	const juntarDataComHoras = (data: Date, horas: Date): Date => {
		const novaData = new Date(data.getTime())
		novaData.setHours(novaData.getHours() + horas.getHours())
		novaData.setMinutes(novaData.getMinutes() + horas.getMinutes())

		return novaData
	}

	const somarTempoAData = (data: Date, tempo: number): Date => {
		const novaData = new Date(data.getTime())
		novaData.setMinutes(novaData.getMinutes() + tempo)

		return novaData
	}

	const formatarDataParaBR = (date: Date | null): string => {
		if (!date) return ''

		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = String(date.getFullYear()).slice(-2)

		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')

		return `${day}.${month}.${year} ${hours}:${minutes}`
	}

	return {
		extrairHorario,
		extrairData,
		juntarDataComHoras,
		somarTempoAData,
		formatarDataParaBR
	}
}
