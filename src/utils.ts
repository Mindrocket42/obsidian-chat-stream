/**
 * Generate a string of random hexadecimal chars
 */
export const randomHexString = (len: number) => {
	const t = []
	for (let n = 0; n < len; n++) {
		t.push(((16 * Math.random()) | 0).toString(16))
	}
	return t.join('')
}

/**
 * Sleep for the specified number of milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms))
}
