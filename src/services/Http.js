import config from 'config'

class Http {

	static get(path) {
		return fetch(`${path}`)
			.then(response => response.json())
	}

}

export default Http
