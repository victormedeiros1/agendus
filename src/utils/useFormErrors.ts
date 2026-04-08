// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getError(v$: any, path: string): boolean {
	const keys = path.split('.')
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let current: any = v$

	for (const key of keys) {
		if (current === null) return false
		current = current[key]
	}

	return current?.$error ?? false
}
