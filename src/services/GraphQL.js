import config from 'config'

const gql = (template) => {
	if (Array.isArray(template)) {
		return template.join('')
	}
	else {
		return template
	}
}

class GraphQL {

	static query(query, variables = undefined) {
		return fetch(`${config.server.url}${config.server.graphQLPath}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ query, variables })
		})
			.then(response => response.json())
			.then((response) => {
				if (response.errors) {
					throw response.errors
				}

				return response
			})
	}

}

export { gql, GraphQL as default }
