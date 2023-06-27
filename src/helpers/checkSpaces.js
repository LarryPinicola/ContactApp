const regex = /\s/;

export function checkSpaces(value) {
	return !regex.test(value);
}
