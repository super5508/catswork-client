
console.log(`Current Environment:`, process.env.NODE_ENV)
const config = {
	server: {
		url: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'http://dashboard.catswork.io/',
		graphQLPath: 'graphql'
	}
}

export default config
