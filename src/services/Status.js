import axios from 'axios'
import config from "./../config"

class Status {

	static status() {
		return axios.get(config.server.url + 'api/status', {withCredentials: true})
	}

}

export default Status
