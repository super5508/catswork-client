import config from 'config'
import axios from 'axios'
//Making String
const gql = (template) => {
	if (Array.isArray(template)) {
		return template.join('')
	}
	else {
		return template
	}
}

//Making request
class GraphQL {
	static query(query, variables = undefined) {
		console.log(JSON.stringify({ query, variables }))
		return axios({
			method: 'POST',
			url: `${config.server.url}${config.server.graphQLPath}`,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data: JSON.stringify({ query, variables })
		})
			.then(response => 
				{
					console.log(response.data.data.catWorksDashboard)
					return response.data
				})
	
	}

}

export { gql, GraphQL as default }
