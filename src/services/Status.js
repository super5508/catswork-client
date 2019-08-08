import axios from 'axios'

class Status {

	static status() {
		return axios.get('http://localhost:7777/api/status', {withCredentials: true})
	}

}

export default Status
