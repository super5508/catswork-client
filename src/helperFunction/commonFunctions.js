export const fixStringValues = (passedString) => {
	const removeUnderScore = passedString.split('_').join(" ")
	return removeUnderScore.charAt(0).toUpperCase() + removeUnderScore.slice(1).toLowerCase();
 }