export const fixStringValues = (passedString) => {
	console.log(`Passed String:`, passedString)
	if (passedString === 'LINKED_IN' || passedString === 'linked_in') return "Linkedin"
	if (passedString === 'RE_CONNECT' || passedString === 're-connect') return "Re-connect"
	else {
		const removeUnderScore = passedString.split('_').join(" ")
		return removeUnderScore.charAt(0).toUpperCase() + removeUnderScore.slice(1).toLowerCase()
	}
 }
