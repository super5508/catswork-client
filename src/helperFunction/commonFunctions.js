export const fixStringValues = (passedString) => {
	console.log(`Passed String:`, passedString)
	if (passedString === 'LINKED_IN' || passedString === 'linked_in' || passedString === "LinkedIn") return "LinkedIn"
	if (passedString === 'RE_CONNECT' || passedString === 're_connect') return "Re-connect"
	if (passedString === 'email_follow_up') return "Email follow-up"
	else {
		const removeUnderScore = passedString.split('_').join(" ")
		return removeUnderScore.charAt(0).toUpperCase() + removeUnderScore.slice(1).toLowerCase()
	}
 }
