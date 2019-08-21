import axios from 'axios'

class Status {

	static status() {
		return axios.get('http://localhost:8080/api/status', {withCredentials: true})
	}

}

export default Status
