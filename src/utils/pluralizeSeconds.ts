export const pluralizeSeconds = (time: number): string => {
	return `${time} second${time > 1 ? 's' : ''}`
}
