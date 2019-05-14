import config from 'config'

class Http {

	static get(path) {
		return fetch(`${config.server.url}api/${path}`)
			.then(response => response.json())
	}

}

export default Http
