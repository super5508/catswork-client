export const fixStringValues = (passedString) => {
	if (passedString === 'LINKED_IN') return "Linkedin"
	if (passedString === 'RE_CONNECT') return "Re-connect"
	else {
		const removeUnderScore = passedString.split('_').join(" ")
		return removeUnderScore.charAt(0).toUpperCase() + removeUnderScore.slice(1).toLowerCase()
	}
 }
