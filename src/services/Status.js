import axios from 'axios'

class Status {

	static status() {
		return axios.get('/api/status', {withCredentials: true})
	}

}

export default Status
