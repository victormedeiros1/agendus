interface useTimeReturn {
	extractTime: (date: Date) => string
	extractDate: (date: Date) => string
	addTimeToDate: (date: Date, dateWithTime: Date) => Date
	addMinutesToDate: (date: Date, minutes: number) => Date
	formatDateTimeBR: (date: Date | null) => string
}

export default function useTime(): useTimeReturn {
	const extractTime = (date: Date): string => {
		const hours = date.getHours().toString().padStart(2, '0')
		const minutes = date.getMinutes().toString().padStart(2, '0')
		return `${hours}:${minutes}`
	}

	const extractDate = (date: Date): string => {
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()

		return `${day}/${month}/${year}`
	}

	const addTimeToDate = (data: Date, dateWithTime: Date): Date => {
		const newDate = new Date(data.getTime())
		newDate.setHours(newDate.getHours() + dateWithTime.getHours())
		newDate.setMinutes(newDate.getMinutes() + dateWithTime.getMinutes())

		return newDate
	}

	const addMinutesToDate = (date: Date, minutes: number): Date => {
		const newDate = new Date(date.getTime())
		newDate.setMinutes(newDate.getMinutes() + minutes)

		return newDate
	}

	const formatDateTimeBR = (date: Date | null): string => {
		if (!date) return ''

		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = String(date.getFullYear()).slice(-2)

		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')

		return `${day}.${month}.${year} ${hours}:${minutes}`
	}

	return {
		extractTime,
		extractDate,
		addTimeToDate,
		addMinutesToDate,
		formatDateTimeBR
	}
}
